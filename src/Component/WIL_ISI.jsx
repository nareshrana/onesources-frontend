import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { loader } from "./CommonComponent/Loader";

const Wil_ISI = () => {

  useEffect(() => {
    loader("hide")
  }, []);

  return (
    <>
      <header className="default-page-heading">
        <div className="site-main-log1">
        {/* <h4>Terms of use</h4> */}
        </div>
      </header>
      <div className="wrapper-site">
        <Container>
          <Row>
            <div className="privacy">
              <div className="privacy-policy mt-3">
                <div className="privacy-content">
                  <p><strong>Indications and Important Safety Information for wilate® [von Willebrand Factor/Coagulation Factor VIII Complex (Human)].</strong></p>
                  <p className="mt-3 mb-1">
                  <strong>Indications</strong>
                  </p>
                  <p>wilate® is a von Willebrand Factor/Coagulation Factor VIII Complex (Human) indicated in children and adults with von Willebrand disease for on-demand treatment and control of bleeding episodes; for perioperative management of bleeding; and for routine prophylaxis to reduce the frequency of bleeding episodes in children 6 years of age and older and adults with VWD. wilate® is also indicated in adolescents and adults with hemophilia A for routine prophylaxis to reduce the frequency of bleeding episodes; and for on-demand treatment and control of bleeding episodes.</p>
                  <p className="mt-3 mb-1">
                  <strong>Contraindications</strong>
                  </p>
                  <p>wilate® is contraindicated in patients with known hypersensitivity reactions, including anaphylactic or severe systemic reactions, to human plasma-derived products, any ingredient in the formulation, or components of the container.</p>
                  <p className="mt-3 mb-1">
                  <strong>Warnings and Precautions</strong>
                  </p>
                  <p><strong>Hypersensitivity Reactions</strong></p>
                  <p>Hypersensitivity reactions may occur with wilate®. Signs and symptoms include angioedema, burning and stinging at the infusion site, chills, flushing, generalized urticaria, headache, hives, hypotension, lethargy, nausea, restlessness, tachycardia, tightness of the chest, tingling, vomiting, and wheezing that may progress to severe anaphylaxis (including shock) with or without fever. Closely monitor patients receiving wilate® and observe for any symptoms throughout the infusion period.<br/>
                  Because inhibitor antibodies may occur concomitantly with anaphylactic reactions, evaluate patients experiencing an anaphylactic reaction for the presence of inhibitors.</p>
                  <p><strong>Thromboembolic Events</strong></p>
                  <p>In VWD, continued treatment using a FVIII-containing VWF product may cause an excessive rise in FVIII activity, which may increase the risk of thromboembolic events. Monitor plasma levels of VWF:RCo and FVIII activities in patients receiving wilate to avoid sustained excessive VWF and FVIII activity levels.</p>
                  
                  <p><strong>Neutralizing Antibodies</strong></p>

                  <p><strong>VWD</strong></p>
                  <ul>
                    <li>Neutralizing antibodies (inhibitors) to FVIII and VWF in patients with VWD, especially type 3 patients, may occur. If a patient develops inhibitor to VWF (or to FVIII), the condition will manifest itself as an inadequate clinical response. Thus, if expected VWF activity plasma levels are not attained, or if bleeding is not controlled with an adequate dose or repeated dosing, perform an appropriate assay to determine whether a VWF inhibitor is present.</li>
                    <li>In patients with antibodies against VWF, VWF is not effective and wilate administration may lead to severe adverse events. Consider other therapeutic options for such patients.</li>
                    <li>Because inhibitor antibodies may occur concomitantly with anaphylactic reactions, evaluate patients experiencing an anaphylactic reaction for the presence of inhibitors.</li>
                  </ul>

                  <p><strong>Hemophilia A</strong></p>
                  <ul>
                    <li>Monitor plasma Factor VIII activity by performing a validated test (e.g., one stage clotting assay), to confirm that adequate Factor VIII levels have been achieved and maintained.</li>
                    <li>Monitor for the development of Factor VIII inhibitors. Perform a Bethesda inhibitor assay if expected Factor VIII plasma levels are not attained, or if bleeding is not controlled with the expected dose of Wilate. Use Bethesda Units (BU) to report inhibitor levels.</li>
                  </ul>

                  <p><strong>Transmissible Infectious Agents</strong></p>
                  <p>wilate® is made from human plasma. Because this product is made from human blood, it may carry a risk of transmitting infectious agents, e.g., viruses, and theoretically, the variant Creutzfeldt-Jakob disease (vCJD) agent. There is also the possibility that unknown infectious agents may be present in the product. The risk that wilate® will transmit viruses has been reduced by screening plasma donors for prior exposure to certain viruses, by testing for the presence of certain current virus infections, and by inactivating and removing certain viruses during manufacture. Despite these measures, it may still potentially transmit disease.<br/>
                  Record the batch number of the product every time wilate® is administered to a patient and consider appropriate vaccination (against hepatitis A and B virus) of patients in regular/repeated receipt of wilate®. ALL infections thought by a physician possibly to have been transmitted by this product should be reported by the physician or other healthcare provider to Octapharma USA, Inc., at 1-866-766-4860.</p>

                  <p><strong>Monitoring and Laboratory Tests</strong></p>
                  <ul>
                    <li>Monitor plasma levels of VWF:RCo and FVIII activities in patients receiving wilate® to avoid sustained excessive VWF and FVIII activity levels, which may increase the risk of thromboembolism, particularly in patients with known clinical or laboratory risk factors.</li>
                    <li>Monitor for development of VWF and FVIII inhibitors. Perform assays to determine whether VWF and/or FVIII inhibitor(s) is present if bleeding is not controlled with the expected dose of wilate®.</li>
                  </ul>

                  <p><strong>Adverse Reactions</strong></p>
                  <p>The most common adverse reactions to treatment with wilate (≥ 1%) in patients with VWD were hypersensitivity reactions, urticaria, and dizziness. The most common adverse reactions to treatment with wilate (≥ 1%) in previously treated patients with hemophilia A was pyrexia (fever).</p>
                  <br/>
                  <p><strong>Please see Full Prescribing Information at <a style={{textDecoration:"underline"}}target="_blank" href="http:///wilateusa.com/pi">wilateusa.com/pi.</a></strong></p>

                </div>
              </div>
            </div>
          </Row>
        </Container>
        </div>
    </>
  );
};
export default Wil_ISI;
