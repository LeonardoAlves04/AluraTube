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
        <Timeline playlists={config.playlists}></Timeline>
      </div>
    </>
  )
}

export default HomePage

const StyledBanner = styled.div`
background-image: url(https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)
background-position: center center;
height:230px;
`;

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
      <StyledBanner />
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

