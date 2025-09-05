const qrContainer = document.getElementById('qr-container');
const linkInput = document.getElementById('link');
const colorInput = document.getElementById('color');
const bgInput = document.getElementById('bgColor');
const sizeInput = document.getElementById('size');
const sizeVal = document.getElementById('sizeVal');
const shapeSelect = document.getElementById('shape');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download-btn');

sizeInput.addEventListener('input', () => sizeVal.textContent = sizeInput.value + 'px');

let qrCode = new QRCodeStyling({
    width: parseInt(sizeInput.value),
    height: parseInt(sizeInput.value),
    data: "",
    dotsOptions: { type: "square", color: "#ffffff" },
    backgroundOptions: { color: "#121212" },
});

qrCode.append(qrContainer);

function generateQRCode() {
    qrCode.update({
        data: linkInput.value || " ",
        width: parseInt(sizeInput.value),
        height: parseInt(sizeInput.value),
        dotsOptions: { type: shapeSelect.value, color: colorInput.value },
        backgroundOptions: { color: bgInput.value }
    });
}

generateBtn.addEventListener('click', generateQRCode);

downloadBtn.addEventListener('click', () => {
    qrCode.getRawData("png").then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr_code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
