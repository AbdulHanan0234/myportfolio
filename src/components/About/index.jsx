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

const Title = styled.div`
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
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const About = () => {
  return (
    <Container id="about">
      <Wrapper>
        <Title>About Me</Title>
        <Desc>{Bio.description}</Desc>
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
