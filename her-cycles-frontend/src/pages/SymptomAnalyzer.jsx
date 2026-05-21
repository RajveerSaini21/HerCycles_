// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Progress } from "../Components/ui/progress";
// import { Button } from "../Components/ui/button";
// import { ArrowLeft, Loader2 } from 'lucide-react';
// import Step1Symptoms from '../Components/analyzer/Step1Symptoms';
// import Step2Severity from '../Components/analyzer/Step2Severity';
// import Step3Duration from '../Components/analyzer/Step3Duration';
// import Step4Context from '../Components/analyzer/Step4Context';
// import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';

// const totalSteps = 4;

// export default function SymptomAnalyzer() {
//   const [step, setStep] = useState(1);
//   const [analysisData, setAnalysisData] = useState({
//     selectedSymptoms: [],
//     customSymptom: '',
//     severity: '',
//     duration: '',
//     cycleDay: '',
//     details: ''
//   });
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const navigate = useNavigate();

//   const updateData = (newData) => {
//     setAnalysisData(prev => ({ ...prev, ...newData }));
//   };

//   const nextStep = () => setStep(prev => (prev < totalSteps ? prev + 1 : prev));
//   const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

//   const handleAnalyze = async () => {
//     setIsAnalyzing(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/analyzer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(analysisData),
//       });
//       const json = await res.json();
//       if (json.success) {
//         // Navigate to result page with plain text
//         navigate("/AnalysisResult", { state: { result: json.data } });
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1: return <Step1Symptoms data={analysisData} onUpdate={updateData} />;
//       case 2: return <Step2Severity data={analysisData} onUpdate={updateData} />;
//       case 3: return <Step3Duration data={analysisData} onUpdate={updateData} />;
//       case 4: return <Step4Context data={analysisData} onUpdate={updateData} />;
//       default: return null;
//     }
//   };

//   if (isAnalyzing) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
//         <Loader2 className="w-16 h-16 text-sky-500 animate-spin mb-6" />
//         <h2 className="text-2xl font-bold text-gray-800">Analyzing Your Symptoms...</h2>
//         <p className="text-gray-600 mt-2">Our AI health assistant is preparing your insights. Please wait a moment.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto space-y-8">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
//           Symptom Analyzer
//         </h1>
//         <p className="text-gray-600 mt-2">Get preliminary insights into your symptoms. This is not a medical diagnosis.</p>
//       </div>

//       <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle>Step {step} of {totalSteps}</CardTitle>
//           <Progress value={(step / totalSteps) * 100} className="w-full mt-2" />
//         </CardHeader>
//         <CardContent className="p-6">
//           {renderStep()}
//         </CardContent>
//       </Card>

//       <div className="flex justify-between items-center">
//         <Button variant="outline" onClick={prevStep} disabled={step === 1}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         {step < totalSteps ? (
//           <Button onClick={nextStep} className="bg-sky-500 hover:bg-sky-600">Next Step</Button>
//         ) : (
//           <Button onClick={handleAnalyze} className="bg-gradient-to-r from-sky-500 to-cyan-600">Analyze Symptoms</Button>
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "../Components/ui/progress";
import { Button } from "../Components/ui/button";
import { ArrowLeft, Loader2 } from 'lucide-react';
import Step1Symptoms from '../Components/analyzer/Step1Symptoms';
import Step2Severity from '../Components/analyzer/Step2Severity';
import Step3Duration from '../Components/analyzer/Step3Duration';
import Step4Context from '../Components/analyzer/Step4Context';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';

const totalSteps = 4;

export default function SymptomAnalyzer() {
  const [step, setStep] = useState(1);
  const [analysisData, setAnalysisData] = useState({
    selectedSymptoms: [],
    customSymptom: '',
    severity: '',
    duration: '',
    cycleDay: '',
    details: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const updateData = (newData) => {
    setAnalysisData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

  // inside SymptomAnalyzer component
  // SymptomAnalyzer.jsx — replace handleAnalyze with this
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      console.log("Sending analysisData:", analysisData);

      const res = await fetch("http://localhost:5001/api/analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analysisData),
      });

      const text = await res.text();
      console.log("Raw response text:", text.slice ? text.slice(0, 2000) : text); // show first 2k chars
      let payload;
      try {
        payload = JSON.parse(text);
      } catch (err) {
        console.warn("Response is not JSON-parsable:", err);
        // If backend returned a plain JSON string inside `data`, try to handle that below.
        // We'll still wrap into object
        payload = { success: false, data: text, _raw: true };
      }

      console.log("Parsed payload:", payload);

      if (!payload || typeof payload !== "object") {
        throw new Error("Analyzer returned invalid payload");
      }

      if (payload.success) {
        // ensure we pass an object, not a JSON string
        let result = payload.data;
        if (typeof result === "string") {
          try {
            result = JSON.parse(result);
            console.log("Parsed payload.data into object:", result);
          } catch (err) {
            // keep string but wrap, UI handles it
            console.warn("payload.data is string and not JSON:", err);
          }
        }

        // final type check
        if (typeof result === "string") {
          // put it in { raw: ... } so AnalysisResult shows pretty fallback
          navigate("/AnalysisResult", { state: { result: { raw: result } } });
        } else {
          // normal case: pass object
          navigate("/AnalysisResult", { state: { result } });
        }
      } else {
        console.error("Analyzer returned error payload:", payload);
        alert("Analyzer returned an error: " + (payload.error || "Unknown"));
      }
    } catch (err) {
      console.error("Analyzer fetch error:", err);
      alert("Failed to reach analyzer. Check backend console and CORS.");
    } finally {
      setIsAnalyzing(false);
    }
  };






  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Symptoms data={analysisData} onUpdate={updateData} />;
      case 2: return <Step2Severity data={analysisData} onUpdate={updateData} />;
      case 3: return <Step3Duration data={analysisData} onUpdate={updateData} />;
      case 4: return <Step4Context data={analysisData} onUpdate={updateData} />;
      default: return null;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <Loader2 className="w-16 h-16 text-sky-500 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-gray-800">Analyzing Your Symptoms...</h2>
        <p className="text-gray-600 mt-2">Our AI health assistant is preparing your insights. Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
          Symptom Analyzer
        </h1>
        <p className="text-gray-600 mt-2">Get preliminary insights into your symptoms. This is not a medical diagnosis.</p>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Step {step} of {totalSteps}</CardTitle>
          <Progress value={(step / totalSteps) * 100} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="p-6">
          {renderStep()}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {step < totalSteps ? (
          <Button onClick={nextStep} className="bg-sky-500 hover:bg-sky-600">Next Step</Button>
        ) : (
          <Button onClick={handleAnalyze} className="bg-gradient-to-r from-sky-500 to-cyan-600">Analyze Symptoms</Button>
        )}
      </div>
    </div>
  );
}