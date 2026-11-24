function Container() {
  return (
    <div className="bg-[rgba(68,15,124,0.02)] h-[45px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e4e2ee] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[20px] left-[16px] not-italic text-[#5e5873] text-[14px] top-[12px] whitespace-nowrap">Department</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5e5873] text-[14px] whitespace-nowrap">Engineering</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[12px] w-[466.891px]" data-name="Container">
      <Text />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e4e2ee] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5e5873] text-[14px] whitespace-nowrap">Sales</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[12px] w-[466.891px]" data-name="Container">
      <Text1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e4e2ee] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5e5873] text-[14px] whitespace-nowrap">Marketing</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[12px] w-[466.891px]" data-name="Container">
      <Text2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e4e2ee] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5e5873] text-[14px] whitespace-nowrap">{`HR & Ops`}</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[12px] w-[474.578px]" data-name="Container">
      <Text3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e4e2ee] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#5e5873] text-[14px] whitespace-nowrap">Finance</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex items-center left-[16px] top-[12px] w-[474.578px]" data-name="Container">
      <Text4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[25px] items-end leading-[20px] left-[462.36px] not-italic text-[#5e5873] text-[14px] top-[-213px] w-[44.531px]">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 w-full">Count</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">8/2</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">2/5</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">4/10</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">98</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">76</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[25px] items-end leading-[20px] left-[302.36px] not-italic text-[#5e5873] text-[14px] top-[-213px] w-[44.531px]">
      <p className="font-['Poppins:SemiBold',sans-serif] relative shrink-0 w-full">Count</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">412</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">238</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">154</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">98</p>
      <p className="font-['Consolas:Bold',sans-serif] relative shrink-0 text-right w-full">76</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container10 />
        <Frame />
        <Frame1 />
      </div>
    </div>
  );
}

export default function ComponentsSection() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="ComponentsSection">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container />
        <Container1 />
        <Container3 />
        <Container5 />
        <Container7 />
        <Container9 />
      </div>
      <div aria-hidden className="absolute border border-[#e4e2ee] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}