import { Link } from "react-router-dom"
import { Footer, FooterIcon, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function Rodape() {
  return (
    <Footer container className="bg-blue-800 dark:bg-blue-700 mt-8 rounded-none shadow-[0_-8px_15px_-3px_rgba(107,114,128,0.7),_0_-2px_8px_-2px_rgba(107,114,128,0.7)]">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/toolkit.svg" className="h-12" alt="Logo Caixa de Ferramentas" />
            <span className="text-shadow-lg text-shadow-gray-800/30 self-center font-noto text-2xl whitespace-nowrap dark:text-white text-white text-shadow-inner">
              Caixa de Ferramentas
            </span>
          </Link>
          <FooterLinkGroup className="text-white">
            <FooterLink href="#">Sobre</FooterLink>
            <FooterLink href="#">Políticas de Privacidade</FooterLink>
            <FooterLink href="#">Licença</FooterLink>
            <FooterLink href="#">Contatos</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright className="text-white" href="#" by="Caixa de Ferramentas" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon className="text-white" href="#" icon={BsFacebook} />
            <FooterIcon className="text-white" href="#" icon={BsInstagram} />
            <FooterIcon className="text-white" href="#" icon={BsTwitter} />
            <FooterIcon className="text-white" href="#" icon={BsGithub} />
            <FooterIcon className="text-white" href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}