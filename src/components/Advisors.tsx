
import React, { useRef, useEffect } from 'react';

interface AdvisorProps {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  delay: number;
}

const Advisor: React.FC<AdvisorProps> = ({ name, title, bio, imageUrl, delay }) => {
  const advisorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (advisorRef.current) observer.observe(advisorRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={advisorRef}
      className="animate-on-scroll" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        <div className="aspect-square overflow-hidden rounded-md mb-6 bg-slate-lightest/50">
          <div className="w-full h-full bg-gradient-to-tr from-slate-light to-slate-lightest flex items-center justify-center">
            <span className="text-navy/30 font-neue text-xl">{name.charAt(0)}</span>
          </div>
        </div>
        <h3 className="heading-sm text-navy-dark mb-1">{name}</h3>
        <p className="text-gold-dark font-medium mb-4">{title}</p>
        <p className="text-slate/90">{bio}</p>
      </div>
    </div>
  );
};

const Advisors = () => {
  const advisors = [
    {
      name: "Razell Smart",
      title: "Founder & CEO",
      bio: "With a disciplined approach honed by 13 years in the Armed Forces, Razell specializes in delivering innovative, strategic financial solutions to high-achieving entrepreneurs and professionals. Razell's expertise lies in asset protection, growth optimization, and personalized financial strategy.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Faith Paddon",
      title: "Associate",
      bio: "An accomplished professional with an integrated business degree from UCF, Faith is dedicated to demystifying complex financial strategies. Her approachable style ensures clarity, helping high-income professionals secure their financial futures with confidence and precision.",
      imageUrl: "/placeholder.svg"
    }
  ];

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="section bg-white">
      <div className="container-custom">
        <h2 
          ref={titleRef}
          className="heading-lg text-navy-dark text-center mb-16 animate-on-scroll"
        >
          Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {advisors.map((advisor, index) => (
            <Advisor
              key={index}
              name={advisor.name}
              title={advisor.title}
              bio={advisor.bio}
              imageUrl={advisor.imageUrl}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advisors;
