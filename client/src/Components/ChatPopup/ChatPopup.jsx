import React, { useState, useEffect } from 'react';
import './ChatPopup.css';

export default function ChatPopup({ userText, onClose }) {
    const [agentResponse, setAgentResponse] = useState(`**To: Healthcare Professionals**

    Dear Colleagues,
    
    As we continue to navigate through these challenging times due to the COVID-19 pandemic, it is crucial that we stay informed and vigilant. Below are key points from recent updates relevant to your practice and patient care:
    
    1. **Increased Cases Worldwide**: Globally, there has been a significant rise in new cases of COVID-19, notably in regions with lower vaccination rates. It is imperative that we remain cautious and prepared to manage potential surges in our facilities.
    
    2. **Variants & Treatments**: The emergence of new variants necessitates heightened awareness regarding their impact on current treatments and vaccines, including antiviral therapeutics showing promise in reducing COVID-19 severity.
    
    3. **Prevention Measures**: Continuous monitoring for symptoms among our staff is essential to prevent outbreaks within healthcare settings. Adhering strictly to updated protocols and maintaining rigorous infection control measures (e.g., PPE, sanitation) will be critical in curtailing virus transmission.
    
    4. **Patient Care Protocols**: Stay abreast of the evolving guidelines based on recent scientific evidence and emerging data trends to ensure optimal care for our patients.
    
    5. **Global Collaboration**: Our commitment to collaborating with healthcare organizations worldwide will be vital in fostering research, sharing information, and coordinating a unified response effort.
    
    Please continue to prioritize the well-being of both yourselves and those under your care during these trying times.
    
    ---
    
    **To: General Public**
    
    Dear Community Member,
    
    In light of increasing COVID-19 cases around the globe, it's essential for everyone to stay informed and proactive in their health practices. Here are important updates tailored for you:
    
    1. **Stay Vaccinated**: With rising cases, please ensure that your vaccination status is up to date, including booster shots as recommended by public health authorities.
    
    2. **Be Alert to Variants**: Stay informed about emerging variants and adjust travel plans or self-isolation measures accordingly for the safety of yourself and others.
    
    Written in a clear, concise manner suitable for both medical professionals and the general public, these emails cover essential topics while maintaining context. The structure separates the information into two distinct sections with subject lines that clearly indicate the audience, ensuring relevance and ease of access for each group's specific needs.
    
    **Subject-Summary:** COVID-19 Updates - Healthcare Professionals & General Public Version 1
    
    **Details to File (separate documents or email attachments as required):**
    
    **Health Care Professionals Section Detail Document/Email Attachment:**
    
    - Subject Line: Essential COVID-19 Developments for Healthcare Providers
    - Background Information on Variants, Vaccines, and Treatment Advancements
    - Updated Infection Control Guidelines & Patient Care Protocols
    - Importance of Collaboration in Global Pandemic Response Efforts
    
    **General Public Section Detail Document/Email Attachment:**
    
    - Subject Line: COVID-19 Updates for the Community
    - Vaccination Recommendations and Variants Awareness
    - Symptom Recognition and Seeking Medical Attention
    - Prevention Strategies to Limit Spread within Communities
    - Mental Health Resources and Support during Prolonged Pandemic Conditions`);

  return (
    <div className="popupOverlay">
      <div className="popup">
        <div className="popupContent">
          <p>User: composes email based on summary to doctors and general public separately into a file with subject-summary and details"</p>
          <p>Agent: {agentResponse}</p>
        </div>
        <button className="closeButton" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
