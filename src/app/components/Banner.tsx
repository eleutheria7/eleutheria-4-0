import Image from "next/image";

export default function Banner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "120px",
      }}
    >
      <div
        style={{
          width: "1300px",   // 👈 aumente aqui
          maxWidth: "95%",
        }}
      >
        <Image
          src="/img_page/cabecalho.jpg"
          alt="Banner"
          width={1600}
          height={400}
          style={{
            width: "100%",
            height: "70%",
            borderRadius: "20px",
          }}
          priority
        />
      </div>
    </div>
  );
}
