
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import json
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

@app.post("/review/")
async def review_code(file: UploadFile = File(...)):
    """
    Receives a code file, saves it temporarily, and sends it for Gemini review.
    """
    file_path = file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()

    prompt = f"""Review this code for readability, modularity, and potential bugs, then provide improvement suggestions. 
    Respond in a JSON array format, where each object has 'line' (integer) and 'suggestion' (string) keys. 
    If no specific line is applicable, use 0 for 'line'.

Code:

```\n{file_content}\n```"""

    try:
        response = model.generate_content(prompt)
        # Assuming the LLM returns a JSON string directly
        try:
            raw_llm_response = response.text.strip()
            if raw_llm_response.startswith('```json') and raw_llm_response.endswith('```'):
                raw_llm_response = raw_llm_response[len('```json'):-len('```')].strip()
            elif raw_llm_response.startswith('```') and raw_llm_response.endswith('```'):
                raw_llm_response = raw_llm_response[len('```'):-len('```')].strip()

            llm_suggestions = json.loads(raw_llm_response)
        except json.JSONDecodeError:
            llm_suggestions = [{"line": 0, "suggestion": "LLM response was not valid JSON. Raw response: " + response.text}]

        review = {
            "filename": file.filename,
            "suggestions": llm_suggestions,
            "code": file_content
        }
    except Exception as e:
        review = {
            "filename": file.filename,
            "suggestions": [{"line": 0, "suggestion": f"Error during LLM review: {str(e)}"}],
            "code": file_content
        }

    return review

@app.get("/")
def read_root():
    return {"message": "Welcome to the Code Review Assistant API"}

