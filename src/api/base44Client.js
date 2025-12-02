// Custom backend client (replaces Base44 SDK)
const API_BASE_URL = 'http://localhost:8000';

export const base44 = {
    auth: {
        me: async () => ({
            id: 'user-id',
            full_name: 'אנליסט שוק',
            email: 'user@example.com'
        }),
        logout: async () => console.log('Logout')
    },
    entities: {
        ResearchBrief: {
            list: async () => [],
            create: async (data) => ({ id: `brief_${Date.now()}`, ...data })
        },
        ResearchCase: {
            list: async () => []
        },
        ReportTemplate: {
            list: async () => {
                // Return empty array for now - templates can be stored in localStorage
                const templates = localStorage.getItem('report_templates');
                return templates ? JSON.parse(templates) : [];
            },
            create: async (data) => {
                const templates = localStorage.getItem('report_templates');
                const existing = templates ? JSON.parse(templates) : [];
                const newTemplate = {
                    id: `template_${Date.now()}`,
                    ...data,
                    created_date: new Date().toISOString()
                };
                existing.unshift(newTemplate);
                localStorage.setItem('report_templates', JSON.stringify(existing));
                return newTemplate;
            }
        },
        Signal: {
            list: async () => {
                const data = localStorage.getItem('base44_signals');
                return data ? JSON.parse(data) : [];
            },
            update: async (id, updates) => {
                const items = JSON.parse(localStorage.getItem('base44_signals') || '[]');
                const index = items.findIndex(i => i.id === id);
                if (index > -1) {
                    items[index] = { ...items[index], ...updates };
                    localStorage.setItem('base44_signals', JSON.stringify(items));
                    return items[index];
                }
                return null;
            },
            delete: async (id) => {
                const items = JSON.parse(localStorage.getItem('base44_signals') || '[]');
                const newItems = items.filter(i => i.id !== id);
                localStorage.setItem('base44_signals', JSON.stringify(newItems));
            },
            create: async (data) => {
                const items = JSON.parse(localStorage.getItem('base44_signals') || '[]');
                const newItem = { ...data, id: `signal_${Date.now()}`, created_date: new Date().toISOString() };
                items.unshift(newItem);
                localStorage.setItem('base44_signals', JSON.stringify(items));
                return newItem;
            }
        },
        SignalInstance: {
            list: async () => {
                const data = localStorage.getItem('base44_signal_instances');
                return data ? JSON.parse(data) : [];
            },
            update: async (id, updates) => {
                const items = JSON.parse(localStorage.getItem('base44_signal_instances') || '[]');
                const index = items.findIndex(i => i.id === id);
                if (index > -1) {
                    items[index] = { ...items[index], ...updates };
                    localStorage.setItem('base44_signal_instances', JSON.stringify(items));
                    return items[index];
                }
                return null;
            },
            create: async (data) => {
                const items = JSON.parse(localStorage.getItem('base44_signal_instances') || '[]');
                const newItem = { ...data, id: `instance_${Date.now()}`, created_date: new Date().toISOString() };
                items.unshift(newItem);
                localStorage.setItem('base44_signal_instances', JSON.stringify(items));
                return newItem;
            }
        }
    },
    integrations: {
        Core: {
            InvokeLLM: async ({ prompt, response_json_schema }) => {
                // Call our custom backend for report generation
                try {
                    const response = await fetch(`${API_BASE_URL}/report/generate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            question: prompt,
                            model_id: 'gemini-2.5-pro'
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Backend error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log('[InvokeLLM] Backend response:', data);
                    return data;
                } catch (error) {
                    console.error('[InvokeLLM] Error calling backend:', error);
                    throw error;
                }
            },
            UploadFile: async () => ({ url: 'http://mock.url/file.pdf' }),
            SendEmail: async () => { },
            GenerateImage: async () => ({ url: 'http://mock.url/image.png' }),
            ExtractDataFromUploadedFile: async () => ({}),
            CreateFileSignedUrl: async () => ({}),
            UploadPrivateFile: async () => ({})
        }
    },
    // Alias for backward compatibility
    llm: {
        InvokeLLM: async (params) => {
            return base44.integrations.Core.InvokeLLM(params);
        }
    }
};

