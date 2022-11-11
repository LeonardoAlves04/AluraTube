import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline"


function HomePage() {
  console.log(config.playlists)
  return (
    <>
      <CSSReset />
      <div >
        <Menu></Menu>
        <Header></Header>
        <Banner></Banner>
        <Timeline playlists={config.playlists}></Timeline>
      </div>
    </>
  )
}

function Banner(props) {
  const imagem = <img src="./assets/banner.jpg"></img>
  return (<div>
    {imagem}
  </div>)
}

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info{
    margin-top: 50px;
    display: flex;
    align-items: center;
    widht: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner"></img> */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`}></img>
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline(props) {
  const playlistNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>

      {playlistNames.map(function (playlistName) {
        const videos = props.playlists[playlistName];
        console.log(videos);
        return (
          < section >
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section >
        )
      })}
    </StyledTimeline>
  )

}

export default HomePage