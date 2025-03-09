import InfoList from './InfoList.jsx';

function Footer() {
  const companyInfo = [
    { label: '상호명', value: '넥스트러너스' },
    { label: '사업자등록번호', value: '540-86-00384' },
    { label: '통신판매업 신고번호', value: '2020-경기김포-3725호' },
    { label: '대표', value: '이한별' },
    { label: '주소', value: '경기도 김포시 사우중로 87 201호' },
  ];
  const company = [
    { label: '고객센터', value: '상담톡 바로가기' },
    { label: '이메일', value: 'kdigital@nextrunners.co.kr' },
    { label: '전화', value: '070-4099-8219' },
    { label: '상담시간', value: '평일 11시~17시 (공휴일 휴무)' },
  ];

  return (
    <footer className="flex align-center gap-16 mt-28 h-[20rem] ">
      <div className="text-grayDark">
        <div className="flex gap-16">
          <InfoList data={companyInfo} />
          <InfoList data={company} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
