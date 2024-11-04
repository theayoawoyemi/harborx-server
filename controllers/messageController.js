const axios = require("axios");

// Submit form
exports.sendMessage = async (req, res, next) => {
  const formData = req.body;

  if (!formData)
    return res.status(400).json({
      message: "Error submitting form your campaign",
      status: "fail",
    });

  const portalId = "139531838";
  const formId = "fae269ec-390b-4c98-bd5b-bdbab1de8df3";
  const formEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  formData.context.ipAddress = req.socket.remoteAddress || undefined;

  try {
    await axios.post(formEndpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(201).json({
      status: "success",
      message: "Your form has been submitted successfully!",
    });
  } catch (error) {
    console.log("Error", error.response);
    return res.status(400).json({
      message: "Error submitting form your campaign",
      status: "fail",
    });
  }
};
