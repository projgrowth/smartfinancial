import { useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

export default function useNavigateSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (sectionId: string) => {
    if (!sectionId) return;
    if (pathname === '/') {
      smoothScrollTo(sectionId);
    } else {
      navigate({ pathname: '/', hash: `#${sectionId}` });
    }
  };
}
