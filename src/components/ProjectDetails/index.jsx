import { useEffect } from 'react';
import { FaXmark, FaGithub, FaLinkedin } from 'react-icons/fa6';
import styled from 'styled-components'

const Overlay = styled.div`
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: top;
justify-content: center;
overflow-y: scroll;
transition: all 0.5s ease;
z-index: 1300;
`;

const Wrapper = styled.div`
max-width: 800px;
width: 100%;
border-radius: 16px;
margin: 50px 12px;
height: min-content;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 20px;
display: flex;
flex-direction: column;
position: relative;
`;

const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
      font-size: 24px;
      margin: 6px 6px 0px 6px;
  }
`;

const Date = styled.div`
    font-size: 16px;
    margin: 2px 6px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`



const Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        margin: 6px 6px;
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
`;

const Label = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 16px;
        margin: 8px 6px;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0px;
    @media only screen and (max-width: 600px) {
        margin: 4px 0px;
    }
`;

const Tag = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    margin: 4px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primary + 20};
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-wrap: wrap;
    margin: 12px 6px;
    @media only screen and (max-width: 600px) {
        margin: 4px 6px;
    }
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 4px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media only screen and (max-width: 600px) {
        width: 32px;
        height: 32px;
    }
`;

const MemberName = styled.div`
    font-size: 16px;
    font-weight: 500;
    width: 200px;
    color: ${({ theme }) => theme.text_primary};
    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;


const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 12px 0px;
    gap: 12px;
`;

const Button = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== '$dull',
})`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    padding: 12px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primary};
    ${({ $dull, theme }) => $dull && `
        background-color: ${theme.bgLight};
        color: ${theme.text_secondary};
        &:hover {
            background-color: ${({ theme }) => theme.bg + 99};
        }
    `}
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease;
    &:hover {
        background-color: ${({ theme }) => theme.primary + 99};
    }
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 24px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;

    const close = () => setOpenModal({ state: false, project: null });

    // Close on Escape, like the MUI Modal did
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!project) return null;

    return (
        <Overlay onClick={close} role="dialog" aria-modal="true" aria-label={project.title}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <CloseButton aria-label="Close project details" onClick={close}>
                    <FaXmark />
                </CloseButton>
                <Image src={project.image} alt={`${project.title} screenshot`} />
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Tags>
                    {project.tags?.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </Tags>
                <Desc>{project.description}</Desc>
                {project.member && (
                    <>
                        <Label>Members</Label>
                        <Members>
                            {project.member.map((member) => (
                                <Member key={member.name}>
                                    <MemberImage src={member.img} alt={member.name} />
                                    <MemberName>{member.name}</MemberName>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}} aria-label={`${member.name} on GitHub`}>
                                        <FaGithub />
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}} aria-label={`${member.name} on LinkedIn`}>
                                        <FaLinkedin />
                                    </a>
                                </Member>
                            ))}
                        </Members>
                    </>
                )}
                <ButtonGroup>
                    <Button $dull href={project.github} target="_blank" rel="noopener noreferrer">View Code</Button>
                    <Button href={project.webapp} target="_blank" rel="noopener noreferrer">View Live App</Button>
                </ButtonGroup>
            </Wrapper>
        </Overlay>
    )
}

export default ProjectDetails
