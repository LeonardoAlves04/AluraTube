import React from "react";
import config from "../config.json"
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    console.log("useEffect");
    service
      .getAllVideos()
      .then((dados) => {
        console.log(dados.data);
        const novasPlaylists = {};
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
          novasPlaylists[video.playlist] = [
            video,
            ...novasPlaylists[video.playlist],
          ];
        });

        setPlaylists(novasPlaylists);
      });
  }, []);

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
     background-image: url(${config.bg});
     background-size: cover;
    height: 300px;
`;

const StyledFavorites = styled.div`
      width: 100%;
      display:block;
      padding: 16px;
      overflow: hidden;
      h2 {
        font - size: 16px;
      margin-bottom: 16px;
      text-transform: capitalize;
        
    }
      img {
        object - fit: cover;
      width: 100%;
      height: auto;
      border-radius:50%;
      aspect-ratio:1/1;
      max-width:100px;
      margin-left: 10px
    }
      section {
        width: 100%;
      padding: 0;
      overflow: hidden;
      padding: 16px;
    }
    section > div {
        width: auto;
      display: flex;
    }
    sectio > div > a {
        scroll - snap - align: start;
      text-align: center;
      padding-left: 5px;
    }
    section > div > a > span {
        padding - top: 8px;
      display: block;
    }
      `;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <a href="https://github.com/LeonardoAlves04"><img src={`https://github.com/${config.github}.png`} /></a>
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

function Timeline({ searchValue, ...propriedades }) {
  const playlistNames = Object.keys(propriedades.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>
                        {video.title}
                      </span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}

      <h2>favoritos</h2>
      <StyledFavorites>
        <div className="container-img-favorite">
          <a href="https://www.youtube.com/@valorantesportsbr"><img className="img-favorite" src="https://yt3.ggpht.com/_z4kYQ1KzISEY3Y3vVH_j3Gn2IaafeLRqUSanOUc7fktTXjUPdV00pHaQjvLmgsieMiHJjYk=s48-c-k-c0x00ffffff-no-rj" /> </a>
          <a href="https://www.youtube.com/@Programadorbr"><img className="img-favorite" src="https://yt3.ggpht.com/ytc/AMLnZu8zAmF1BDo7p8K9xw_3tr0J8fEdWbbq64ykTRSTpg=s48-c-k-c0x00ffffff-no-rj" /> </a>
          <a href="https://www.youtube.com/@dicasparadevs"><img className="img-favorite" src="https://yt3.ggpht.com/tTQ1wPAQm448OhG7QVwfiSs0MKIcu-A5lQUq3dhAMxQ6R4TWpLL3RgtG6G61Ji3COUUn__Yoxw=s48-c-k-c0x00ffffff-no-rj" /> </a>
        </div>
      </StyledFavorites>
    </StyledTimeline>
  )
}