import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LayoutFront from "./components/LayoutFront";
import Home from "./components/Home";
import SearchResultLayout from "./components/SearchResultLayout";
import ArtistsResult from "./components/searchcomponents/ArtistsResult";
import AllResults from "./components/searchcomponents/AllResults";
import PlaylistsResult from "./components/searchcomponents/PlaylistsResult";
import AlbumsResult from "./components/searchcomponents/AlbumsResult";
import PodcastsResult from "./components/searchcomponents/PodcastsResult";
import SongResults from "./components/searchcomponents/SongsResult";
import ProfilesResult from "./components/searchcomponents/ProfilesResult";
import Playlist from "./components/Playlist";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Install_app from "./pages/Install_app";
import Premium from "./pages/Premium";
import Support from "./pages/Support";
import Article from "./pages/Article";
import SearchResult from "./pages/SearchResult";
import Browse from "./pages/Browse";
import NoFound from "./pages/NoFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutFront />}>
        <Route index element={<Home />} />
        <Route path="download" element={<Install_app />} />
        <Route path="premium" element={<Premium />} />
        <Route path="support" element={<Support />} />
        {/* <Route path="/album/:id" element={<Browse />} /> */}

        <Route path="search">
          <Route index element={<Browse />} />
          <Route path=":term" element={<SearchResultLayout />}>
            <Route index element={<AllResults />} />
            <Route path="*" element={<AllResults />} />
            <Route path="songs" element={<SongResults />} />
            <Route path="artists" element={<ArtistsResult />} />
            <Route path="playlists" element={<PlaylistsResult />} />
            <Route path="albums" element={<AlbumsResult />} />
            <Route path="podcasts" element={<PodcastsResult />} />
            <Route path="profiles" element={<ProfilesResult />} />
          </Route>
        </Route>

        <Route path="/album/:id" element={<Playlist />} />
        <Route path="*" element={<NoFound />} />
      </Route>

      <Route path="/article/*" element={<Article />} />
      <Route path="/search-result/*" element={<SearchResult />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
