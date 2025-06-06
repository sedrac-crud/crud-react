import { Button } from "./ui/button";

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = "/public/app-release.apk";
  link.setAttribute("download", "my-app.apk");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default function DownloadButton() {
  return (
    <Button onClick={handleDownload}>
      Baixar APK
    </Button>
  );
}
