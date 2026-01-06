from fastapi import FastAPI, Path, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import uuid
import google.generativeai as genai

app = FastAPI()

# CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
def load_data():
    with open("patient.json", "r") as f:
        return json.load(f)

# Save data
def save_data(data):
    with open("patient.json", "w") as f:
        json.dump(data, f, indent=4)

@app.get("/")
def hello():
    return {"message": "Patient Management System API"}

@app.get("/about")
def about():
    return {"message": "A fully functional API to Manage Your Patients records"}

@app.get("/view")
def view():
    return load_data()

@app.get("/patient/{patient_id}")
def view_patient(
    patient_id: str = Path(..., description="Patient ID", example="P001")
):
    data = load_data()
    if patient_id in data:
        return data[patient_id]
    raise HTTPException(status_code=404, detail="patient not found")

@app.get("/sort")
def sort_patients(
    sort_by: str = Query(...),
    order: str = Query("asc")
):
    valid_fields = ["height", "weight", "bmi"]
    if sort_by not in valid_fields:
        raise HTTPException(status_code=400, detail="Invalid field")

    data = load_data()
    reverse = True if order == "desc" else False
    return sorted(data.values(), key=lambda x: x[sort_by], reverse=reverse)

# ✅ NEW: Add patient from frontend form
@app.post("/add")
def add_patient(patient: dict):
    data = load_data()

    # 1. Extract values and ensure they are numbers
    try:
        weight = float(patient.get("weight", 0))
        height_cm = float(patient.get("height", 0))
        
        # 2. Calculate BMI (Weight in kg / Height in meters squared)
        if height_cm > 0:
            height_m = height_cm / 100
            bmi = round(weight / (height_m ** 2), 2)
            
            # 3. Determine Verdict
            if bmi < 18.5:
                verdict = "Underweight"
            elif 18.5 <= bmi < 25:
                verdict = "Normal weight"
            elif 25 <= bmi < 30:
                verdict = "Overweight"
            else:
                verdict = "Obese"
        else:
            bmi = 0
            verdict = "Invalid height"
            
    except (ValueError, TypeError):
        bmi = 0
        verdict = "Data error"

    # 4. Add the calculated fields back to the patient object
    patient["bmi"] = bmi
    patient["verdict"] = verdict

    # 5. Create ID and Save
    patient_id = f"P{str(uuid.uuid4())[:4]}"
    data[patient_id] = patient

    save_data(data)
    return {"message": "Patient added", "id": patient_id, "bmi": bmi, "verdict": verdict}



# Configure your API Key (Get one at aistudio.google.com)
genai.configure(api_key="AIzaSyBjzdoPjNNJwfMJSN2gbV0FpOvP9FBMTpU")

@app.get("/ai-advice/{patient_id}")
def get_ai_advice(patient_id: str):
    data = load_data()
    if patient_id not in data:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient = data[patient_id]
    
    prompt = f"""
    You are a professional medical assistant. Analyze this patient record:
    Age: {patient.get('age')}
    BMI: {patient.get('bmi')}
    Verdict: {patient.get('verdict')}
    Gender: {patient.get('gender')}
    
    Provide a 2-sentence health recommendation for this patient.
    """
    
    try:
        # Use 'gemini-1.5-flash' which is the current stable name
        model = genai.GenerativeModel('gemini-3-flash-preview')
        response = model.generate_content(prompt)
        return {"advice": response.text}
    except Exception as e:
        # Fallback for older library versions if flash fails
        try:
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content(prompt)
            return {"advice": response.text}
        except Exception as second_error:
            raise HTTPException(status_code=500, detail=f"AI Error: {str(second_error)}")