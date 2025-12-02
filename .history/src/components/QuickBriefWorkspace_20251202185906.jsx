import React, { useState, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Plus, Trash2, Grid3x3, Type, Heading1, Play, Code, Layout, Sparkles,
    CheckCircle, AlertTriangle, TrendingUp, Star, Info, ThumbsUp, ThumbsDown,
    BarChart2, PieChart as PieIcon, Target, MessageCircle, DollarSign, Zap,
    Wrench, Shield, Battery, Smartphone, LineChart as LineChartIcon
} from 'lucide-react';

// --- Design System Colors (Notion-like Black/Slate Theme) ---
const COLORS = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    chartColors: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6']
};

const PIE_COLORS = ['#10b981', '#94a3b8', '#ef4444'];

// ============================================
// REAL DATA FROM ORAL-B RESEARCH PRESENTATION
// ============================================

// Slide 2: Satisfaction Leaderboard
const ratingData = [
    { name: 'iO 3', rating: 4.83, reviews: 180, price: '~605 NIS', sentiment: 92 },
    { name: 'iO 5', rating: 4.79, reviews: 210, price: '~749 NIS', sentiment: 93 },
    { name: 'iO 9', rating: 4.53, reviews: 255, price: '~1,512 NIS', sentiment: 59 },
    { name: 'iO 10', rating: 4.36, reviews: 330, price: '~2,017 NIS', sentiment: 78 },
];

const purchaseVolumeData = [
    { name: 'iO 2', volume: 4000 },
    { name: 'iO 3', volume: 4000 },
    { name: 'iO 5', volume: 2000 },
    { name: 'iO 9', volume: 800 },
    { name: 'iO 10', volume: 900 },
];

// Slide 3: Sentiment Analysis
const overallSentiment = [
    { name: 'Positive', value: 1170, percentage: 53 },
    { name: 'Neutral', value: 915, percentage: 41 },
    { name: 'Negative', value: 135, percentage: 6 },
];

const sentimentByModel = [
    { name: 'iO 3', positive: 180, neutral: 15, negative: 0 },
    { name: 'iO 5', positive: 210, neutral: 15, negative: 0 },
    { name: 'iO 9', positive: 240, neutral: 135, negative: 30 },
    { name: 'iO 10', positive: 270, neutral: 30, negative: 45 },
];

// Slide 4: Key Drivers
const featureData = [
    { name: 'Cleaning', mentions: 435, sentiment: 'positive' },
    { name: 'Price', mentions: 285, sentiment: 'mixed' },
    { name: 'Heads', mentions: 270, sentiment: 'mixed' },
    { name: 'App', mentions: 240, sentiment: 'mixed' },
    { name: 'Charging', mentions: 240, sentiment: 'mixed' },
    { name: 'Durability', mentions: 180, sentiment: 'negative' },
];

// --- Initial State with Oral-B Slides ---
const initialSlides = [
    {
        id: 'slide-exec',
        topic: 'Executive Summary',
        prompts: 'Summarize the key findings for Oral-B iO customer satisfaction.',
        code: '',
        elements: [
            // Full-width intro
            { id: 'intro', type: 'text', colSpan: 3, content: 'Comprehensive analysis of Oral-B iO customer satisfaction across multiple platforms.' },
            // Research Scope highlight box - full width
            {
                id: 'scope', type: 'highlight-box', colSpan: 3, title: 'Research Scope & Data Sources',
                leftContent: {
                    label: 'Platforms Analyzed:',
                    tags: ['Reddit', 'Amazon', 'Superpharm', 'YouTube', 'Facebook', 'TikTok']
                },
                rightContent: [
                    { value: '2,220 Comments & Reviews', subtitle: 'Sentiment & feature analysis' },
                    { value: '975 Superpharm Reviews', subtitle: 'Product ratings across 4 models' },
                    { value: '11,700 Amazon Purchases', subtitle: 'Last month volume data' }
                ]
            },
            // 3-column insight cards
            {
                id: 'card1', type: 'card', colSpan: 1, icon: 'check', title: 'High Satisfaction',
                content: 'Average ratings between 4.36-4.83 out of 5',
                footer: 'iO 3 and iO 5 lead with 4.83 and 4.79 ratings'
            },
            {
                id: 'card2', type: 'card', colSpan: 1, icon: 'trending', title: 'Top Strength',
                content: 'Cleaning performance praised across all models',
                footer: '"Professional clean at home" is the key message'
            },
            {
                id: 'card3', type: 'card', colSpan: 1, icon: 'alert', title: 'Key Concerns',
                content: 'Price, reliability, and brush head design',
                footer: 'Premium models face more criticism'
            },
            // Headline Recommendations - full width with 2-col grid inside
            {
                id: 'recs', type: 'recommendations', colSpan: 3, title: 'Headline Recommendations',
                items: [
                    { icon: '📈', text: 'Position iO 3 and iO 5 as "hero value" models in mainstream marketing' },
                    { icon: '💎', text: 'Use iO 9 and iO 10 as halo models, but address price and reliability concerns' },
                    { icon: '✨', text: 'Double down on cleaning performance in all communication' },
                    { icon: '🔧', text: 'Investigate and fix: charging failures, open box issues, and mold concerns' }
                ]
            }
        ]
    },
    // Slide 2: Satisfaction Leaderboard
    {
        id: 'slide-satisfaction',
        topic: 'Satisfaction Leaderboard',
        prompts: 'Visualize the customer ratings and purchase volume.',
        code: '',
        elements: [
            { id: 'sat-intro', type: 'text', colSpan: 3, content: 'Based on Superpharm ratings and multi-platform sentiment analysis' },
            { id: 'chart-rating', type: 'chart', colSpan: 3, chartType: 'bar', data: ratingData, title: 'Average Customer Ratings by Model' },
            { 
                id: 'model-cards', type: 'model-cards-grid', colSpan: 3, 
                models: [
                    { name: 'iO 3', price: '~605 NIS', rating: 4.83, reviews: 180, sentiment: 92 },
                    { name: 'iO 5', price: '~749 NIS', rating: 4.79, reviews: 210, sentiment: 93 },
                    { name: 'iO 9', price: '~1,512 NIS', rating: 4.53, reviews: 255, sentiment: 59 },
                    { name: 'iO 10', price: '~2,017 NIS', rating: 4.36, reviews: 330, sentiment: 78 }
                ]
            },
            { id: 'chart-volume', type: 'chart', colSpan: 3, chartType: 'bar-horizontal-volume', data: purchaseVolumeData, title: 'Amazon Purchase Volume (Last Month)' }
        ]
    },
    // Slide 3: Sentiment Analysis Overview
    {
        id: 'slide-sentiment',
        topic: 'Sentiment Analysis Overview',
        prompts: 'Analyze the sentiment distribution across platforms.',
        code: '',
        elements: [
            { id: 'sent-intro', type: 'text', colSpan: 3, content: 'Cross-platform sentiment across all Oral-B iO models' },
            { id: 'chart-pie', type: 'chart', colSpan: 1, chartType: 'pie', data: overallSentiment, title: 'Overall Sentiment Distribution' },
            { 
                id: 'sentiment-breakdown', type: 'sentiment-breakdown', colSpan: 2, title: 'Sentiment Breakdown',
                data: [
                    { label: 'Positive', count: 1170, percentage: 53, color: '#10b981' },
                    { label: 'Neutral', count: 915, percentage: 41, color: '#a3e635' },
                    { label: 'Negative', count: 135, percentage: 6, color: '#ef4444' }
                ]
            },
            {
                id: 'callout', type: 'callout', colSpan: 3, 
                highlight: '53% positive sentiment',
                text: 'indicates strong overall satisfaction with the iO line across all platforms.'
            },
            { id: 'chart-model', type: 'chart', colSpan: 3, chartType: 'stacked-bar', data: sentimentByModel, title: 'Sentiment Distribution by Model' },
            {
                id: 'insights-row', type: 'two-column-cards', colSpan: 3,
                cards: [
                    { title: 'Mid-Tier Excellence', content: 'iO 3 and iO 5 show almost exclusively positive sentiment with minimal neutral and zero negative comments in the dataset.' },
                    { title: 'Premium Model Debate', content: 'iO 9 and iO 10 maintain high positive counts but attract more neutral and negative feedback, primarily around price and reliability.' }
                ]
            }
        ]
    },
    // Slide 4: Key Drivers of Satisfaction
    {
        id: 'slide-drivers',
        topic: 'Key Drivers of Satisfaction',
        prompts: 'Feature mentions and sentiment across all platforms.',
        code: '',
        elements: [
            { id: 'drivers-intro', type: 'text', colSpan: 3, content: 'Feature mentions and sentiment across all platforms' },
            { id: 'chart-features', type: 'chart', colSpan: 3, chartType: 'feature-bar', data: featureData, title: 'Feature Mention Frequency' },
            {
                id: 'positive-drivers', type: 'driver-section', colSpan: 3, 
                icon: 'thumbsup', title: 'Positive Drivers', variant: 'positive',
                cards: [
                    { title: 'Cleaning Performance', content: 'Most mentioned feature with overwhelmingly positive sentiment. "Professional clean at home" is the core strength.' },
                    { title: 'Quality Perception', content: 'Mid-tier models (iO 3, iO 5) praised for build quality and premium feel at reasonable prices.' },
                    { title: 'Competitive Edge', content: 'Users report noticeable upgrade vs. older Oral-B models and Philips Sonicare competitors.' }
                ]
            },
            {
                id: 'pain-points', type: 'driver-section', colSpan: 3,
                icon: 'thumbsdown', title: 'Pain Points', variant: 'negative',
                cards: [
                    { title: 'Price Concerns', content: 'Premium models face skepticism about incremental value.' },
                    { title: 'Reliability Issues', content: 'Charging failures and durability concerns, particularly for high-end models.' },
                    { title: 'Brush Head Design', content: 'Concerns about moisture accumulation and mold formation inside heads.' },
                    { title: 'App Experience', content: 'Mixed feedback on usefulness. Many users abandon after initial use.' }
                ]
            },
            {
                id: 'strategic-insight', type: 'strategic-insight', colSpan: 3,
                title: 'Strategic Insight',
                content: 'Cleaning performance is the undisputed core strength. However, premium models need clearer value differentiation beyond cleaning, and reliability issues must be addressed to maintain trust at higher price points.'
            }
        ]
    },
    // Slide 5: Feature Deep Dive
    {
        id: 'slide-features',
        topic: 'Feature Deep Dive',
        prompts: 'Detailed analysis of key product features and user feedback.',
        code: '',
        elements: [
            { id: 'feat-intro', type: 'text', colSpan: 3, content: 'Detailed analysis of key product features and user feedback' },
            {
                id: 'feature-cards', type: 'feature-cards-grid', colSpan: 3,
                features: [
                    { icon: 'sparkle', title: 'Cleaning Performance', mentions: 435, status: 'EXCELLENT', statusColor: 'green', description: 'Undisputed core strength. "Professional clean at home."', action: 'Lead all marketing with this' },
                    { icon: 'alert', title: 'Brush Head Design', mentions: 270, status: 'CRITICAL', statusColor: 'red', description: 'Mold formation concerns - critical hygiene issue.', action: 'URGENT: Audit design & communicate fixes', hasEvidence: true, evidence: [
                        { image: '/src/assets/6e4de1459ba32140cb2c11552fcb564dfc01b33c.png', source: 'Reddit' },
                        { image: '/src/assets/b2979260c1db1ac89b0e323ba207110ca8327ac3.png', source: 'Facebook' },
                        { image: '/src/assets/121f73adb257cc61b6968cfa6c819b34c56adb19.png', source: 'Amazon' }
                    ]},
                    { icon: 'dollar', title: 'Price & Value', mentions: 285, status: 'MIXED', statusColor: 'orange', description: 'Premium models questioned on incremental benefit.', action: 'Clarify premium differentiation' },
                    { icon: 'battery', title: 'Battery & Charging', mentions: 240, status: 'CONCERN', statusColor: 'red', description: 'Charging failures for premium models.', action: 'Investigate failure patterns' },
                    { icon: 'smartphone', title: 'App Experience', mentions: 240, status: 'MIXED', statusColor: 'orange', description: 'Viewed as "nice extra" not essential.', action: 'Simplify onboarding; add tangible value' },
                    { icon: 'wrench', title: 'Durability', mentions: 180, status: 'CONCERN', statusColor: 'red', description: 'Some report multiple replacements within 2 years.', action: 'Quality control review' }
                ]
            },
            {
                id: 'priority-matrix', type: 'priority-matrix', colSpan: 3, title: 'Action Priority Matrix',
                items: [
                    { icon: '🚨', priority: 'CRITICAL - Immediate', description: 'Brush head mold issue', color: 'red' },
                    { icon: '⚠️', priority: 'HIGH - Address Soon', description: 'Battery reliability, durability', color: 'amber' },
                    { icon: '📊', priority: 'MEDIUM - Optimize', description: 'Price perception, app experience', color: 'blue' },
                    { icon: '✅', priority: 'STRENGTH - Amplify', description: 'Cleaning performance messaging', color: 'green' }
                ]
            }
        ]
    },
    // Slide 6: Customer Voices - Strengths
    {
        id: 'slide-positive',
        topic: 'Customer Voices - Strengths',
        prompts: 'Real customer feedback on cleaning performance and value.',
        code: '',
        elements: [
            { id: 'pos-intro', type: 'text', colSpan: 3, content: 'Real customer feedback on cleaning performance and value' },
            {
                id: 'cleaning-quotes', type: 'quotes-section', colSpan: 3,
                icon: 'thumbsup', title: 'Cleaning Performance - Positive', variant: 'positive',
                quotes: [
                    { text: 'My teeth have never felt this clean. My dentist even noticed the difference at my last checkup.', source: 'Amazon Review - iO 5' },
                    { text: 'The pressure sensor is a game-changer. I was brushing way too hard before.', source: 'Reddit - r/DentalHygiene - iO 9' },
                    { text: 'Feels like I just left the dentist every time I brush. Worth every penny for the clean feeling.', source: 'Superpharm Review - iO 3' }
                ]
            },
            {
                id: 'value-quotes', type: 'quotes-section', colSpan: 3,
                icon: 'star', title: 'Value Models (iO 3 & iO 5) - Positive', variant: 'positive',
                quotes: [
                    { text: "I don't need all the bells and whistles. The iO 3 cleans just as well as my friend's iO 9 for half the price.", source: 'Amazon Review - iO 3' },
                    { text: "The iO 5 hits the sweet spot - smart features that matter without paying for extras I won't use.", source: 'Reddit - r/Toothbrushes - iO 5' },
                    { text: 'Best investment in my dental health. The iO 3 delivers professional cleaning at a reasonable price.', source: 'YouTube Comment - iO 3' },
                    { text: 'Upgraded from a manual brush to the iO 5 - it\'s like night and day. My gums are healthier and no more bleeding.', source: 'Superpharm Review - iO 5' }
                ]
            }
        ]
    },
    // Slide 7: Customer Voices - Concerns
    {
        id: 'slide-negative',
        topic: 'Customer Voices - Concerns',
        prompts: 'Real customer feedback on reliability and value issues.',
        code: '',
        elements: [
            { id: 'neg-intro', type: 'text', colSpan: 3, content: 'Real customer feedback on reliability and value issues' },
            {
                id: 'reliability-quotes', type: 'quotes-section', colSpan: 3,
                icon: 'alert', title: 'Reliability & Design Issues - Negative', variant: 'negative',
                quotes: [
                    { text: 'The charging base stopped working after 8 months. For a $300+ toothbrush, this is unacceptable.', source: 'Amazon Review - iO 9' },
                    { text: 'Found mold growing inside the brush head. This is disgusting for something that goes in my mouth daily.', source: 'Reddit - r/DentalHygiene - iO Series' },
                    { text: 'Battery life degraded significantly after a year. Now it dies mid-brush. Very frustrating.', source: 'Superpharm Review - iO 7' },
                    { text: 'The magnetic charger is convenient until it stops working. Then you have an expensive paperweight.', source: 'Amazon Review - iO 10' }
                ]
            },
            {
                id: 'value-concerns', type: 'quotes-section', colSpan: 3,
                icon: 'dollar', title: 'Premium Value Concerns - Negative', variant: 'negative',
                quotes: [
                    { text: "The iO 9 cleans well, but I honestly can't tell the difference from the iO 5. Wish I'd saved the money.", source: 'Reddit - r/Toothbrushes - iO 9' },
                    { text: 'Replacement heads cost almost as much as a basic electric toothbrush. This adds up fast.', source: 'Amazon Review - iO Series' },
                    { text: "The app is clunky and adds no real value. I paid extra for 'smart' features I never use.", source: 'YouTube Comment - iO 10' },
                    { text: 'Great toothbrush when it works, but at this price point, reliability should be guaranteed. Mine failed after 14 months.', source: 'Superpharm Review - iO 9' }
                ]
            }
        ]
    },
    // Slide 8: Strategic Recommendations - Part 1
    {
        id: 'slide-recs1',
        topic: 'Strategic Recommendations - Part 1',
        prompts: 'Critical & High Priority Actions.',
        code: '',
        elements: [
            { id: 'recs1-intro', type: 'text', colSpan: 3, content: 'Critical & High Priority Actions' },
            {
                id: 'rec-heroes', type: 'recommendation-card', colSpan: 3, priority: 'HIGH', icon: 'trending',
                title: 'Elevate iO 3 & iO 5 as Mainstream Heroes',
                rationale: 'Highest satisfaction scores (4.83, 4.79), very low complaint rates',
                actions: ['Focus media and retail support on iO 3 and iO 5', 'Position as "smart choice for most people"', 'Use tagline: "Professional clean without overpaying"'],
                impact: 'Drive volume in high-satisfaction segment'
            },
            {
                id: 'rec-mold', type: 'recommendation-card', colSpan: 3, priority: 'CRITICAL', icon: 'alert',
                title: 'Address Head Design & Mold Concerns Immediately',
                rationale: 'Mold touches hygiene and safety - core values for dental care',
                actions: ['Audit head design for moisture accumulation points', 'Communicate design improvements with before/after explanation', 'Provide explicit cleaning instructions in all packaging'],
                impact: 'Prevent erosion of brand trust'
            },
            {
                id: 'rec-durability', type: 'recommendation-card', colSpan: 3, priority: 'HIGH', icon: 'info',
                title: 'Improve Durability & Charging for Premium Models',
                rationale: 'Repeated failures undermine willingness to pay for top-tier devices',
                actions: ['Use service/warranty data to identify failure patterns', 'Adjust components, connectors, charging dock design', 'Offer simple "fast swap" warranty path for premium models'],
                impact: 'Restore trust in premium purchases'
            }
        ]
    },
    // Slide 9: Strategic Recommendations - Part 2
    {
        id: 'slide-recs2',
        topic: 'Strategic Recommendations - Part 2',
        prompts: 'Medium Priority & Marketing Actions.',
        code: '',
        elements: [
            { id: 'recs2-intro', type: 'text', colSpan: 3, content: 'Medium Priority & Marketing Actions' },
            {
                id: 'rec-premium', type: 'recommendation-card', colSpan: 2, priority: 'MEDIUM', icon: 'info',
                title: 'Clarify Premium Model Value Proposition',
                rationale: 'Consumers perceive limited functional difference beyond cleaning',
                actions: ['Sharpen communication about premium benefits beyond clean', 'Emphasize smart routines, charging conveniences, travel capability', 'Create comparison chart showing clear feature differentiation'],
                impact: 'Reduce disappointment and increase premium conversion'
            },
            {
                id: 'rec-app', type: 'recommendation-card', colSpan: 1, priority: 'MEDIUM', icon: 'info',
                title: 'Reposition App as Value Amplifier',
                rationale: 'Users see app as optional',
                actions: ['Simplify onboarding with "1 minute win" experience', 'Add quick benefits: better coverage, dentist tracking'],
                impact: 'Increase perceived value of smart features'
            },
            {
                id: 'rec-pricing', type: 'recommendation-card', colSpan: 1, priority: 'MEDIUM', icon: 'info',
                title: 'Refine Pricing & Promo Strategy',
                rationale: 'Consumers respond positively to event discounts',
                actions: ['Strategic event-based discounts (Black Friday)', 'Create value packs for iO 3/5 bundling replacement heads'],
                impact: 'Optimize price perception and lifetime value'
            },
            {
                id: 'rec-language', type: 'recommendation-card', colSpan: 2, priority: 'HIGH', icon: 'trending',
                title: 'Leverage Real Customer Language in Marketing',
                rationale: 'Aligning brand language with consumer wording strengthens authenticity',
                actions: ['Use phrases like "professional clean at home"', 'Build creatives using actual review language', 'Create social proof campaigns with verified reviews'],
                impact: 'Increase message resonance and conversion'
            }
        ]
    },
    // Slide 10: Strategic Summary & Next Steps
    {
        id: 'slide-summary',
        topic: 'Strategic Summary & Next Steps',
        prompts: 'Framework and action plan.',
        code: '',
        elements: [
            { id: 'sum-intro', type: 'text', colSpan: 3, content: 'Framework and action plan' },
            {
                id: 'monitoring', type: 'recommendation-card', colSpan: 3, priority: 'ONGOING', icon: 'trending',
                title: 'Establish Continuous Monitoring Dashboard',
                rationale: 'Enable proactive response to emerging issues',
                actions: ['Track average rating by model and platform monthly', 'Monitor complaint topics (mold, charging, price)', 'Set alerts for sudden sentiment shifts'],
                impact: 'Stay ahead of issues'
            },
            {
                id: 'what-so-now', type: 'summary-grid', colSpan: 3, title: 'What, So What, Now What - Summary',
                columns: [
                    { title: 'WHAT', items: ['iO 3/5 are satisfaction leaders', 'Cleaning performance is core strength', 'Premium models face price/reliability criticism', 'Mold concerns are emerging'] },
                    { title: 'SO WHAT', items: ['Strong product truth around cleaning', 'Value ladder needs clearer differentiation', 'Reliability strikes at hygiene trust', 'Risk of premium revenue erosion'] },
                    { title: 'NOW WHAT', items: ['Lead with mid-tier heroes', 'Fix mold and charging urgently', 'Clarify premium value prop', 'Use real customer language'] }
                ]
            },
            {
                id: 'next-steps', type: 'next-steps', colSpan: 3, title: 'Recommended Next Steps',
                steps: [
                    'Share findings with product, marketing, and customer service teams',
                    'Initiate immediate investigation into brush head design and mold concerns',
                    'Set up continuous monitoring dashboard for ongoing sentiment tracking',
                    'Develop detailed implementation roadmap with ownership and timelines'
                ]
            }
        ]
    }
];

// --- Chart Components ---
const ChartRenderer = ({ type, data }) => {
    if (type === 'bar') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="rating" fill="#6366f1" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'bar-vertical') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={50} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'pie') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'stacked-bar') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                    <Legend />
                    <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="neutral" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'bar-horizontal') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="mentions" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'bar-horizontal-volume') {
        // Simple horizontal bar for volume - matching the original thin bar style
        const maxVolume = Math.max(...data.map(d => d.volume));
        return (
            <div className="space-y-2">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-slate-600 text-xs w-12">{item.name}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                            <div 
                                className="h-2 rounded-full"
                                style={{ 
                                    width: `${(item.volume / maxVolume) * 100}%`,
                                    backgroundColor: '#f97316'
                                }}
                            />
                        </div>
                        <span className="text-slate-500 text-xs w-16 text-right">{item.volume.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        );
    }
    if (type === 'feature-bar') {
        // Vertical bar chart with sentiment-based colors
        const getBarColor = (sentiment) => {
            if (sentiment === 'positive') return '#10b981';
            if (sentiment === 'negative') return '#ef4444';
            return '#f97316'; // mixed
        };
        return (
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="mentions" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
    return null;
};

const TableRenderer = ({ data }) => (
    <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Name</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Value</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Trend</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 text-slate-800">{row.name}</td>
                        <td className="py-2 px-3 text-slate-600">{row.value}</td>
                        <td className="py-2 px-3 text-emerald-600 font-medium">+{Math.floor(Math.random() * 20)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Feature Card Component (with evidence tooltip) ---
const FeatureCard = ({ feature }) => {
    const [showEvidence, setShowEvidence] = useState(false);
    
    const getFeatureIcon = (iconName) => {
        switch(iconName) {
            case 'sparkle': return <Sparkles className="w-5 h-5" />;
            case 'alert': return <AlertTriangle className="w-5 h-5" />;
            case 'dollar': return <DollarSign className="w-5 h-5" />;
            case 'battery': return <Battery className="w-5 h-5" />;
            case 'smartphone': return <Smartphone className="w-5 h-5" />;
            case 'wrench': return <Wrench className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };
    
    const getBorderColor = (color) => {
        if (color === 'green') return 'border-l-emerald-500';
        if (color === 'red') return 'border-l-red-500';
        return 'border-l-orange-400';
    };
    
    const getIconBg = (color) => {
        if (color === 'green') return 'bg-emerald-100 text-emerald-600';
        if (color === 'red') return 'bg-red-100 text-red-600';
        return 'bg-orange-100 text-orange-600';
    };
    
    const getStatusBg = (color) => {
        if (color === 'green') return 'bg-emerald-500';
        if (color === 'red') return 'bg-red-500';
        return 'bg-orange-400';
    };
    
    return (
        <div 
            className={`bg-white rounded-xl p-4 border border-slate-200 border-l-4 ${getBorderColor(feature.statusColor)} ${feature.hasEvidence ? 'cursor-help relative' : ''}`}
            onMouseEnter={() => feature.hasEvidence && setShowEvidence(true)}
            onMouseLeave={() => feature.hasEvidence && setShowEvidence(false)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBg(feature.statusColor)}`}>
                        {getFeatureIcon(feature.icon)}
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-medium text-sm">{feature.title}</h4>
                        <p className="text-slate-400 text-xs">{feature.mentions} mentions</p>
                    </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${getStatusBg(feature.statusColor)}`}>
                    {feature.status}
                </span>
            </div>
            <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
            <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-500 text-xs"><span className="font-medium">Action:</span> {feature.action}</p>
            </div>
            
            {/* Evidence Tooltip */}
            {feature.hasEvidence && showEvidence && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-white border-2 border-red-500 rounded-xl p-4 shadow-xl w-[500px]">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-red-500 rotate-45"></div>
                    <p className="text-slate-900 text-sm font-medium mb-3">Consumer Evidence Examples:</p>
                    <div className="grid grid-cols-3 gap-3">
                        {feature.evidence?.map((ev, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="rounded-lg overflow-hidden border border-slate-200">
                                    <img 
                                        src={ev.image} 
                                        alt={`Evidence from ${ev.source}`}
                                        className="w-full h-24 object-cover"
                                    />
                                </div>
                                <p className="text-xs text-center text-slate-500">
                                    Source: <span className="text-slate-700">{ev.source}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Canvas Element Component ---
const CanvasElement = ({ element, onUpdate, onDelete, isHovered, onHover }) => {
    const handleContentChange = (e) => {
        onUpdate(element.id, { content: e.target.innerText });
    };

    const handleTitleChange = (e) => {
        onUpdate(element.id, { title: e.target.innerText });
    };

    // Icon helper
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'check': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'alert': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'trending': return <TrendingUp className="w-5 h-5 text-indigo-500" />;
            case 'star': return <Star className="w-5 h-5 text-amber-400" />;
            case 'thumbsup': return <ThumbsUp className="w-5 h-5 text-emerald-500" />;
            case 'thumbsdown': return <ThumbsDown className="w-5 h-5 text-red-500" />;
            default: return <Info className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div
            className="group relative h-full flex flex-col"
            onMouseEnter={() => onHover(element.id)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => onDelete(element.id)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 bg-white shadow-sm border border-slate-200">
                    <Trash2 size={12} />
                </button>
            </div>

            {element.type === 'heading' && (
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleContentChange}
                    className="outline-none w-full text-2xl font-bold text-slate-900 mb-4"
                >
                    {element.content}
                </div>
            )}

            {element.type === 'text' && (
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleContentChange}
                    className="outline-none text-slate-600 text-sm leading-relaxed whitespace-pre-wrap"
                >
                    {element.content}
                </div>
            )}

            {element.type === 'card' && (
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
                    <div className="flex items-start gap-2 mb-2">
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon(element.icon)}
                        </div>
                        <div className="flex-1">
                            {element.title && (
                                <h3
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleTitleChange}
                                    className="text-slate-900 text-sm font-medium mb-1 outline-none"
                                >
                                    {element.title}
                                </h3>
                            )}
                            <p
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleContentChange}
                                className="text-slate-600 text-sm outline-none"
                            >
                                {element.content}
                            </p>
                        </div>
                    </div>
                    {element.footer && (
                        <div className="mt-2 pt-2 border-t border-slate-200/30">
                            <p className="text-slate-500 text-xs">{element.footer}</p>
                        </div>
                    )}
                </div>
            )}

            {element.type === 'chart' && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-200 transition-all flex flex-col h-full">
                    {element.title && (
                        <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleTitleChange}
                            className="text-slate-800 text-sm font-semibold mb-2 outline-none"
                        >
                            {element.title}
                        </h3>
                    )}
                    <div className="flex-1 min-h-[200px]">
                        <ChartRenderer type={element.chartType} data={element.data} />
                    </div>
                </div>
            )}

            {element.type === 'highlight-box' && (
                <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 rounded-xl p-4 border-l-4 border-indigo-500">
                    {element.title && (
                        <h3 className="text-slate-900 text-sm font-medium mb-3">{element.title}</h3>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Left side - platforms */}
                        <div>
                            {element.leftContent?.label && (
                                <p className="text-slate-600 text-sm mb-2">
                                    <span className="text-slate-900">{element.leftContent.label}</span>
                                </p>
                            )}
                            {element.leftContent?.tags && (
                                <div className="flex flex-wrap gap-1.5">
                                    {element.leftContent.tags.map((tag, i) => (
                                        <span key={i} className="bg-white px-2 py-1 rounded-md text-xs text-slate-600 border border-slate-200/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Right side - stats */}
                        <div className="space-y-2">
                            {element.rightContent?.map((item, i) => (
                                <div key={i} className="bg-white/60 rounded-lg p-2 border border-slate-200/50">
                                    <p className="text-slate-900 text-sm">{item.value}</p>
                                    <p className="text-slate-400 text-xs">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {element.type === 'recommendations' && (
                <div className="bg-gradient-to-br from-slate-100/50 to-indigo-50/30 rounded-xl p-5 border border-slate-200/50">
                    {element.title && (
                        <h3 className="text-slate-900 text-lg font-medium mb-4">{element.title}</h3>
                    )}
                    <div className="grid md:grid-cols-2 gap-3">
                        {element.items?.map((item, i) => (
                            <div key={i} className="bg-white/60 rounded-lg p-3 border border-slate-200/50">
                                <p className="text-slate-900 text-sm">{item.icon} {item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {element.type === 'sentiment-breakdown' && (
                <div className="h-full">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium mb-4">{element.title}</h3>
                    )}
                    <div className="space-y-4">
                        {element.data?.map((item, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 border border-slate-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-700 text-sm">{item.label}</span>
                                    <span className="text-slate-500 text-sm">{item.count.toLocaleString()} comments</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                    <div 
                                        className="h-2 rounded-full transition-all"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    />
                                </div>
                                <div className="text-right">
                                    <span className="text-slate-400 text-xs">{item.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {element.type === 'callout' && (
                <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg p-4">
                    <p className="text-slate-700 text-sm">
                        <span className="text-indigo-600 font-semibold">{element.highlight}</span>
                        {' '}{element.text}
                    </p>
                </div>
            )}

            {element.type === 'insight-card' && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 h-full">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium text-sm mb-2">{element.title}</h3>
                    )}
                    <p className="text-slate-600 text-sm">{element.content}</p>
                </div>
            )}

            {element.type === 'two-column-cards' && (
                <div className="grid grid-cols-2 gap-4">
                    {element.cards?.map((card, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            {card.title && (
                                <h3 className="text-slate-900 font-medium text-sm mb-2">{card.title}</h3>
                            )}
                            <p className="text-slate-600 text-sm">{card.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {element.type === 'driver-section' && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {element.variant === 'positive' ? (
                            <ThumbsUp className="w-5 h-5 text-emerald-500" />
                        ) : (
                            <ThumbsDown className="w-5 h-5 text-red-500" />
                        )}
                        <h3 className="text-slate-900 font-medium">{element.title}</h3>
                    </div>
                    <div className={`grid gap-3 ${element.cards?.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                        {element.cards?.map((card, i) => (
                            <div 
                                key={i} 
                                className={`bg-white rounded-lg p-4 border-l-4 ${
                                    element.variant === 'positive' ? 'border-l-emerald-500' : 'border-l-red-500'
                                } border border-slate-200`}
                            >
                                <h4 className="text-slate-900 font-medium text-sm mb-2">{card.title}</h4>
                                <p className="text-slate-600 text-xs">{card.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {element.type === 'strategic-insight' && (
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium mb-2">{element.title}</h3>
                    )}
                    <p className="text-slate-600 text-sm">{element.content}</p>
                </div>
            )}

            {element.type === 'feature-cards-grid' && (
                <div className="grid grid-cols-2 gap-4">
                    {element.features?.map((feat, i) => (
                        <FeatureCard key={i} feature={feat} />
                    ))}
                </div>
            )}

            {element.type === 'priority-matrix' && (
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium mb-4">{element.title}</h3>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {element.items?.map((item, i) => {
                            const getBorderColor = (color) => {
                                if (color === 'red') return 'border-l-red-500';
                                if (color === 'amber') return 'border-l-amber-500';
                                if (color === 'blue') return 'border-l-blue-500';
                                return 'border-l-emerald-500';
                            };
                            return (
                                <div key={i} className={`bg-white rounded-lg p-3 border border-slate-200 border-l-4 ${getBorderColor(item.color)}`}>
                                    <p className="text-slate-900 text-sm font-medium">{item.icon} {item.priority}</p>
                                    <p className="text-slate-500 text-xs mt-1">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {element.type === 'model-cards-grid' && (
                <div className="grid grid-cols-2 gap-4">
                    {element.models?.map((model, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-slate-900 font-semibold text-lg">{model.name}</h3>
                                    <p className="text-slate-400 text-sm">{model.price}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-slate-700 font-medium text-sm">{model.rating}</span>
                                </div>
                            </div>
                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Reviews:</span>
                                    <span className="text-slate-700 font-medium">{model.reviews}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Positive Sentiment:</span>
                                    <span className="text-slate-700 font-medium">{model.sentiment}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-1">
                                    <div 
                                        className="h-2 rounded-full transition-all"
                                        style={{ 
                                            width: `${model.sentiment}%`,
                                            backgroundColor: model.sentiment >= 90 ? '#f97316' : model.sentiment >= 70 ? '#fb923c' : '#fdba74'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {element.type === 'quote' && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
                    <div className="flex items-start gap-2 mb-2">
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon(element.icon)}
                        </div>
                        <p className="text-slate-700 text-sm italic flex-1">{element.content}</p>
                    </div>
                    {element.footer && (
                        <div className="mt-auto pt-2 border-t border-slate-100">
                            <p className="text-slate-400 text-xs">{element.footer}</p>
                        </div>
                    )}
                </div>
            )}

            {element.type === 'quotes-section' && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {element.icon === 'thumbsup' && <ThumbsUp className="w-5 h-5 text-emerald-500" />}
                        {element.icon === 'thumbsdown' && <ThumbsDown className="w-5 h-5 text-red-500" />}
                        {element.icon === 'star' && <Star className="w-5 h-5 text-emerald-500" />}
                        {element.icon === 'alert' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                        {element.icon === 'dollar' && <DollarSign className="w-5 h-5 text-red-500" />}
                        <h3 className="text-slate-900 font-medium">{element.title}</h3>
                    </div>
                    <div className="space-y-3">
                        {element.quotes?.map((quote, i) => (
                            <div 
                                key={i} 
                                className={`bg-white rounded-lg p-4 border-l-4 ${
                                    element.variant === 'positive' ? 'border-l-emerald-500' : 'border-l-red-500'
                                } border border-slate-200`}
                            >
                                <p className="text-slate-700 text-sm mb-2">"{quote.text}"</p>
                                <p className="text-slate-400 text-xs">{quote.source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {element.type === 'recommendation-card' && (
                <div className={`rounded-xl p-4 border h-full ${
                    element.priority === 'CRITICAL' ? 'bg-red-50 border-red-200' :
                    element.priority === 'HIGH' ? 'bg-amber-50 border-amber-200' :
                    element.priority === 'ONGOING' ? 'bg-indigo-50 border-indigo-200' :
                    'bg-slate-50 border-slate-200'
                }`}>
                    <div className="flex items-start gap-3 mb-3">
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                            element.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                            element.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' :
                            element.priority === 'ONGOING' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-slate-100 text-slate-600'
                        }`}>
                            {element.priority}
                        </div>
                        <h3 className="text-slate-900 font-medium text-sm flex-1">{element.title}</h3>
                    </div>
                    {element.rationale && (
                        <p className="text-slate-600 text-xs mb-3"><span className="font-medium">Why:</span> {element.rationale}</p>
                    )}
                    {element.actions && (
                        <div className="mb-3">
                            <p className="text-slate-700 text-xs font-medium mb-1">Actions:</p>
                            <ul className="space-y-1">
                                {element.actions.map((action, i) => (
                                    <li key={i} className="text-slate-600 text-xs flex items-start gap-1">
                                        <span className="text-indigo-500">•</span> {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {element.impact && (
                        <p className="text-slate-500 text-xs"><span className="font-medium">Impact:</span> {element.impact}</p>
                    )}
                </div>
            )}

            {element.type === 'summary-grid' && (
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium mb-4">{element.title}</h3>
                    )}
                    <div className="grid grid-cols-3 gap-4">
                        {element.columns?.map((col, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 border border-slate-200">
                                <h4 className="text-indigo-600 font-semibold text-sm mb-2">{col.title}</h4>
                                <ul className="space-y-1">
                                    {col.items.map((item, j) => (
                                        <li key={j} className="text-slate-600 text-xs flex items-start gap-1">
                                            <span className="text-slate-400">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {element.type === 'next-steps' && (
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
                    {element.title && (
                        <h3 className="text-slate-900 font-medium mb-4">{element.title}</h3>
                    )}
                    <div className="space-y-2">
                        {element.steps?.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-indigo-100">
                                <span className="bg-indigo-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                <p className="text-slate-700 text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Slide Block Component ---
const SlideBlock = ({ slide, onUpdate, onAddElement, onDeleteElement, onUpdateElement, onRun, isActive, onReorder }) => {
    const [activeTab, setActiveTab] = useState('preview');
    const [hoveredElement, setHoveredElement] = useState(null);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const tabs = [
        { id: 'topic', label: 'Topic', icon: Type },
        { id: 'prompts', label: 'Prompts', icon: Sparkles },
        { id: 'code', label: 'Code', icon: Code },
        { id: 'preview', label: 'Preview', icon: Layout },
    ];

    return (
        <div className="w-full bg-white mb-12 group/slide relative">
            {/* Slide Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={slide.topic}
                        onChange={(e) => onUpdate(slide.id, { topic: e.target.value })}
                        className="text-2xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder-slate-300"
                        placeholder="Enter topic..."
                    />
                </div>
                <button
                    onClick={() => onRun(slide.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Play size={16} fill="currentColor" />
                    <span className="font-medium text-sm">Run Block</span>
                </button>
            </div>

            {/* Tabs Navigation - Visible only on hover */}
            <div className="absolute top-0 right-0 -mt-12 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === 'topic' && (
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Research Question / Topic</label>
                            <textarea
                                value={slide.topic}
                                onChange={(e) => onUpdate(slide.id, { topic: e.target.value })}
                                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none text-slate-700"
                                placeholder="What is the main goal of this block?"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'prompts' && (
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">System Prompts</label>
                            <textarea
                                value={slide.prompts}
                                onChange={(e) => onUpdate(slide.id, { prompts: e.target.value })}
                                className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none font-mono text-sm text-slate-700"
                                placeholder="Enter prompts for the AI..."
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="relative group">
                        <div className="absolute right-4 top-4 px-2 py-1 bg-slate-200 rounded text-xs font-mono text-slate-600 pointer-events-none">HTML</div>
                        <textarea
                            value={slide.code}
                            onChange={(e) => onUpdate(slide.id, { code: e.target.value })}
                            className="w-full h-96 p-4 bg-slate-900 text-slate-50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none font-mono text-sm"
                            spellCheck="false"
                            placeholder="<div>Custom HTML...</div>"
                        />
                    </div>
                )}

                {activeTab === 'preview' && (
                    <div className="relative bg-slate-50/50 border border-slate-100 rounded-xl p-6 min-h-[400px]">
                        <Droppable droppableId={slide.id} direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="grid grid-cols-3 gap-4 auto-rows-min"
                                >
                                    {slide.elements.map((element, index) => {
                                        // Determine column span
                                        const colSpan = element.colSpan || (element.type === 'heading' ? 3 : 1);
                                        const colSpanClass = colSpan === 3 ? 'col-span-3' : colSpan === 2 ? 'col-span-2' : 'col-span-1';
                                        
                                        // Determine min height based on type
                                        const isCompact = ['text', 'card'].includes(element.type);
                                        const isLarge = ['chart', 'highlight-box', 'recommendations'].includes(element.type);
                                        const heightClass = isCompact ? '' : isLarge ? 'min-h-[200px]' : '';
                                        
                                        return (
                                        <Draggable key={element.id} draggableId={element.id} index={index}>
                                            {(providedDrag, snapshot) => (
                                                <div
                                                    ref={providedDrag.innerRef}
                                                    {...providedDrag.draggableProps}
                                                    {...providedDrag.dragHandleProps}
                                                    className={`${colSpanClass} ${heightClass}`}
                                                    style={{
                                                        ...providedDrag.draggableProps.style,
                                                    }}
                                                >
                                                    <CanvasElement
                                                        element={element}
                                                        onUpdate={onUpdateElement}
                                                        onDelete={onDeleteElement}
                                                        isHovered={hoveredElement === element.id}
                                                        onHover={setHoveredElement}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* Add Element Button */}
                        <div className="mt-8 flex justify-center relative">
                            <div className="relative">
                                <button
                                    onClick={() => setShowAddMenu(!showAddMenu)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-full hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all"
                                >
                                    <Plus size={16} />
                                    <span className="text-sm font-medium">Add Element</span>
                                </button>

                                {showAddMenu && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-20">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 py-2">Content</div>
                                        <button onClick={() => { onAddElement(slide.id, 'card'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Layout size={16} className="text-slate-400" />
                                            <span className="text-sm">Insight Card</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'text'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Type size={16} className="text-slate-400" />
                                            <span className="text-sm">Text Block</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'heading'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Heading1 size={16} className="text-slate-400" />
                                            <span className="text-sm">Heading</span>
                                        </button>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 py-2 mt-2">Visualization</div>
                                        <button onClick={() => { onAddElement(slide.id, 'bar'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <BarChart2 size={16} className="text-slate-400" />
                                            <span className="text-sm">Bar Chart</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'pie'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <PieIcon size={16} className="text-slate-400" />
                                            <span className="text-sm">Pie Chart</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {showAddMenu && <div className="fixed inset-0 z-10" onClick={() => setShowAddMenu(false)} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---
const QuickBriefWorkspace = () => {
    const [slides, setSlides] = useState(initialSlides);
    const [isRuning, setIsRunning] = useState(false);

    // Slide Management
    const addSlide = () => {
        const newSlide = {
            id: `slide-${Date.now()}`,
            topic: '',
            prompts: '',
            code: '',
            elements: [
                { id: `intro-${Date.now()}`, type: 'text', content: 'Start analyzing...' }
            ]
        };
        setSlides([...slides, newSlide]);
    };

    const updateSlide = (id, updates) => {
        setSlides(slides.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleRunBlock = (id) => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            console.log(`Running block ${id}`);
        }, 1000);
    };

    const handleReorderElements = (result) => {
        if (!result.destination) return;

        const sourceSlideId = result.source.droppableId;
        const destinationSlideId = result.destination.droppableId;

        if (sourceSlideId !== destinationSlideId) return;

        const slideIndex = slides.findIndex(s => s.id === sourceSlideId);
        if (slideIndex === -1) return;

        const slide = slides[slideIndex];
        const newElements = Array.from(slide.elements);
        const [reorderedItem] = newElements.splice(result.source.index, 1);
        newElements.splice(result.destination.index, 0, reorderedItem);

        const newSlides = [...slides];
        newSlides[slideIndex] = { ...slide, elements: newElements };
        setSlides(newSlides);
    };

    const addElementToSlide = (slideId, type) => {
        const newElement = {
            id: `${type}_${Date.now()}`,
            type: type === 'bar' || type === 'pie' || type === 'bar-vertical' ? 'chart' : type,
            chartType: type === 'bar' || type === 'pie' || type === 'bar-vertical' ? type : undefined,
            data: type === 'chart' || type === 'bar' || type === 'pie' ? ratingData : undefined,
            content: type === 'text' ? 'New Insight...' : type === 'card' ? 'Insight details...' : 'New Heading',
            title: type === 'card' ? 'New Insight' : type === 'chart' ? 'Analysis' : undefined,
            icon: type === 'card' ? 'info' : undefined,
            footer: type === 'card' ? 'Key takeaway' : undefined,
        };

        setSlides(slides.map(s => {
            if (s.id === slideId) {
                return { ...s, elements: [...s.elements, newElement] };
            }
            return s;
        }));
    };

    const updateElementInSlide = (elementId, updates) => {
        setSlides(slides.map(s => ({
            ...s,
            elements: s.elements.map(e => e.id === elementId ? { ...e, ...updates } : e)
        })));
    };

    const deleteElementFromSlide = (elementId) => {
        setSlides(slides.map(s => ({
            ...s,
            elements: s.elements.filter(e => e.id !== elementId)
        })));
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div className="w-16 border-r border-slate-200 flex flex-col items-center py-6 bg-slate-50">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-8">
                    <Grid3x3 className="text-white" size={20} />
                </div>
                <div className="flex-1 space-y-4">
                    {slides.map((slide, i) => (
                        <div key={slide.id} className="w-2 h-2 rounded-full bg-slate-300 hover:bg-indigo-500 transition-colors cursor-pointer" title={slide.topic} />
                    ))}
                </div>
                <button onClick={addSlide} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus size={24} />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-5xl mx-auto px-12 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">Strategic Analysis Notebook</h1>
                        <p className="text-slate-500 text-lg">Interactive workspace for data exploration and insight generation.</p>
                    </div>

                    <DragDropContext onDragEnd={handleReorderElements}>
                        <div className="space-y-20">
                            {slides.map((slide) => (
                                <SlideBlock
                                    key={slide.id}
                                    slide={slide}
                                    onUpdate={updateSlide}
                                    onAddElement={addElementToSlide}
                                    onUpdateElement={updateElementInSlide}
                                    onDeleteElement={deleteElementFromSlide}
                                    onRun={handleRunBlock}
                                />
                            ))}
                        </div>
                    </DragDropContext>

                    {/* Add Slide Button at Bottom */}
                    <div className="py-12 border-t border-dashed border-slate-200 mt-12 text-center">
                        <button
                            onClick={addSlide}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-all font-medium"
                        >
                            <Plus size={20} />
                            Add New Analysis Block
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickBriefWorkspace;
