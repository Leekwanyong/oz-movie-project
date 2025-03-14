import { COMPANY, COMPANY_INFO } from '../constant/footer.js';
import InfoList from './InfoList.jsx';

function Footer() {
  return (
    <footer className="flex align-center gap-16 mt-28 h-[20rem] ">
      <div className="text-grayDark">
        <div className="lg:flex lg:flex-row md:flex md:flex-row sm:flex-col gap-16">
          <InfoList data={COMPANY_INFO} />
          <InfoList data={COMPANY} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
