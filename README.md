# Code Review Assistant

This project aims to automate code reviews by analyzing code structure, readability, and best practices using a Large Language Model (LLM).

## Features

*   **Backend API:** Built with FastAPI to receive code files.
*   **Frontend:** A React application for uploading code files and displaying review reports.
*   **LLM Integration (Planned):** Designed to integrate with the Gemini API for code analysis and suggestion generation.

## Project Structure

```
Code-Review-Assistant/
├── .gitattributes
├── .gitignore
├── README.md
├── sample_code.py
├── .venv/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── samplecode.py.txt
│   ├── __pycache__/
│   └── venv/
└── frontend/
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── build/
    ├── node_modules/
    ├── public/
    └── src/
        ├── App.css
        ├── App.js
        ├── index.css
        ├── index.js
        ├── Slider.css
        ├── Slider.js
        ├── Spinner.css
        └── Spinner.js
```

## Setup and Running the Application

Follow these steps to get the Code Review Assistant up and running on your local machine.

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    *   **On Windows:**
        ```bash
        .\venv\Scripts\activate
        ```
    *   **On macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Run the FastAPI application:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the React development server:**
    ```bash
    npm start
    ```
    The frontend application will open in your browser at `http://localhost:3000`.

## Usage

1.  Ensure both the backend and frontend servers are running.
2.  Open your browser to `http://localhost:3000`.
3.  Upload a code file using the provided interface.
4.  The frontend will send the file to the backend, which will (in a real scenario) process it using an LLM and return a review report.
5.  The review report will be displayed on the frontend.

## Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue to discuss it.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## LLM Integration (Future Work)

Currently, the backend provides a mock review response. To integrate with a real LLM (e.g., Gemini API), you would need to:

1.  Obtain an API key for the Gemini API.
2.  Modify `backend/main.py` to send the file content to the Gemini API and parse its response.
3.  Replace the mock review logic with the actual LLM interaction.

## Deliverables

*   **GitHub Repo:** This repository contains the source code.
*   **Demo Video:** (To be created by the user based on the running application)

## Evaluation Focus

*   **LLM Insight Quality:** (Once integrated)
*   **Code Handling:** How effectively the application handles file uploads and processing.
*   **API Design:** The structure and usability of the backend API.
*   **Completeness:** The overall functionality and adherence to the project objectives.
