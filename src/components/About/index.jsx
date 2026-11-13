import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Bio } from '../../data/constants';
import { SocialMediaIcons, SocialMediaIcon } from './AboutStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 670px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 600px;
  }
`;

const DescP = styled.p`
  margin: 6px 0;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container id="about">
      <Wrapper>
        <Title>About Me</Title>
        <Desc>
          <DescP>
            Hi, I'm <strong>Abdul Hanan</strong> — a self-taught <strong>MERN Stack Developer</strong> who
            enjoys turning ideas into interactive web experiences.
          </DescP>
          <DescP>
            What started as curiosity about how websites work has grown into a passion for building them. I
            enjoy transforming ideas into functional, user-friendly applications, whether it's creating
            responsive interfaces with <strong>React.js</strong> or developing complete full-stack solutions
            using <strong>Node.js, Express.js, and MongoDB</strong>.
          </DescP>
          <DescP>
            I've built both frontend and full-stack projects, and every project has strengthened my
            problem-solving skills and deepened my understanding of modern web development.
          </DescP>
          <DescP>
            I'm currently looking for a <strong>MERN Stack Internship</strong> where I can learn from
            experienced developers, contribute to real-world projects, and continue growing as a developer. I
            don't just build websites—I enjoy building experiences that are clean, functional, and meaningful.
          </DescP>
        </Desc>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialMediaIcon>
          <SocialMediaIcon href={Bio.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </SocialMediaIcon>
        </SocialMediaIcons>
      </Wrapper>
    </Container>
  );
};

export default About;
