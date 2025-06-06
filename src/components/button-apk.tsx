import { Button } from "./ui/button";

export default function ButtonApk() {
    return (
        <a href="/public/app-release.apk">
            <Button className="rounded-full md:min-w-[200px] p-6 text-xl bg-black" size="lg" >Baixar o APK</Button>
        </a>
    )
}