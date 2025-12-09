
import os
import requests
import sys

# Configuration
BACKEND_URL = "http://localhost:8000"
UPLOAD_ENDPOINT = f"{BACKEND_URL}/admin/upload"
SOURCE_DIR = os.path.expanduser("~/Downloads/oralb_kids_oral_hygine")

def upload_files():
    if not os.path.exists(SOURCE_DIR):
        print(f"Error: Directory not found: {SOURCE_DIR}")
        return

    print(f"Scanning directory: {SOURCE_DIR}")
    files = [f for f in os.listdir(SOURCE_DIR) if os.path.isfile(os.path.join(SOURCE_DIR, f))]
    
    if not files:
        print("No files found to upload.")
        return

    print(f"Found {len(files)} files.")

    success_count = 0
    for filename in files:
        file_path = os.path.join(SOURCE_DIR, filename)
        
        # Skip hidden files
        if filename.startswith('.'):
            continue
            
        print(f"Uploading: {filename}...")
        
        try:
            with open(file_path, 'rb') as f:
                # Prepare the files dictionary for multipart/form-data
                # Key must match the parameter name in FastAPI: file: UploadFile = File(...)
                files_data = {'file': (filename, f, 'application/octet-stream')}
                
                # Optional: Add description
                data = {'description': f"Uploaded from {filename}"}
                
                response = requests.post(UPLOAD_ENDPOINT, files=files_data, data=data)
                
                if response.status_code == 200:
                    print(f"✅ Success: {filename}")
                    success_count += 1
                else:
                    print(f"❌ Failed: {filename} - {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Error uploading {filename}: {e}")

    print(f"\nUpload complete. {success_count}/{len(files)} files uploaded successfully.")

if __name__ == "__main__":
    upload_files()
