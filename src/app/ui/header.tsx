import Image from "next/image";
export default function Header() {
  return (
    <header className="w-full flex justify-start items-center gap-8">
      <picture className="p-2 mb-2 bg-white">
        <Image src={`/images/uta.png`}alt="Logo uta" width={50} height={50}/>
      </picture>
      <h1>Sistema de buses UTA</h1>
    </header>
  );
}
