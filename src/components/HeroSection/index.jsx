import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span } from './HeroStyle'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';

const HeroSection = () => {
    return (
        <div>
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        {/* Single h1 with name + roles — the whole hero headline
                            is what crawlers see as the page's main heading */}
                        <Title>
                            Hi, I am <br /> {Bio.name}
                            <TextLoop>
                                I am a
                                <Span>
                                    <Typewriter
                                        options={{
                                            strings: Bio.roles,
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </Span>
                            </TextLoop>
                        </Title>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <Img
                            src="/hero.webp"
                            alt="Abdul Hanan — Full Stack Developer"
                            width="800"
                            height="800"
                            fetchPriority="high"
                        />
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection
