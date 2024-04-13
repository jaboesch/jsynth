"use client";

import { Segment, SpotifyApi } from "@spotify/web-api-ts-sdk";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const LoudnessClock = ({ events }: { events: Segment[] }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSegment, setCurrentSegment] = useState<Segment>();

  const {
    pitch0,
    pitch1,
    pitch2,
    pitch3,
    pitch4,
    pitch5,
    pitch6,
    pitch7,
    pitch8,
    pitch9,
    pitch10,
    pitch11,
  } = useSpring({
    pitch0: currentSegment?.pitches[0] ?? 0,
    pitch1: currentSegment?.pitches[1] ?? 0,
    pitch2: currentSegment?.pitches[2] ?? 0,
    pitch3: currentSegment?.pitches[3] ?? 0,
    pitch4: currentSegment?.pitches[4] ?? 0,
    pitch5: currentSegment?.pitches[5] ?? 0,
    pitch6: currentSegment?.pitches[6] ?? 0,
    pitch7: currentSegment?.pitches[7] ?? 0,
    pitch8: currentSegment?.pitches[8] ?? 0,
    pitch9: currentSegment?.pitches[9] ?? 0,
    pitch10: currentSegment?.pitches[10] ?? 0,
    pitch11: currentSegment?.pitches[11] ?? 0,
    config: { duration: 100 },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((current) => {
        const newTime = (current + 0.1) % events[events.length - 1].start;
        // Find the current segment based on newTime
        const currentSegment = events.find(
          (event) =>
            newTime >= event.start && newTime < event.start + event.duration
        );
        if (currentSegment) {
          setCurrentSegment(currentSegment);
        }
        return newTime;
      });
    }, 100); // Update every 100 milliseconds

    return () => clearInterval(intervalId);
  }, [events]);

  const colors = [
    "#07C8F9ff",
    "#08BCF7ff",
    "#08AFF5ff",
    "#09A3F2ff",
    "#0997F0ff",
    "#0A8BEEff",
    "#0A7EECff",
    "#0B72EAff",
    "#0B66E8ff",
    "#0C5AE5ff",
    "#0C4DE3ff",
    "#0D41E1ff",
  ];

  const pitches = [
    pitch0,
    pitch1,
    pitch2,
    pitch3,
    pitch4,
    pitch5,
    pitch6,
    pitch7,
    pitch8,
    pitch9,
    pitch10,
    pitch11,
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      Time: {currentTime.toFixed(2)}
      <div className="w-full flex flex-row gap-2 justify-center items-end h-[400px]">
        {pitches.map((pitch, i) => (
          <animated.div
            key={`pitch-${i}`}
            className="w-full"
            style={{
              height: pitch.to((l) => `${l * 400}px`),
              backgroundColor: colors[i],
            }}
          />
        ))}
      </div>
      <div className="w-full flex flex-row gap-2 justify-center items-end h-[400px]">
        {pitches.map((pitch, i) => (
          <animated.div
            key={`pitch-${i}`}
            className="w-full h-[200px] border transition duration-75 ease-in-out"
            style={{
              backgroundColor: pitch.get() > 0.85 ? colors[i] : "#00000000",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Player = () => {
  const clientId = "20754fb44be94ba6a3677e448ff5ccc0";
  const clientSecret = "193b1db717b240d6a3cd4a27c31d2f46";
  //   const [authToken, setAuthToken] = useState<string>();
  const [api, setApi] = useState<SpotifyApi>();
  const [segments, setSegments] = useState<Segment[]>();

  useEffect(() => {
    const initApi = SpotifyApi.withClientCredentials(clientId, clientSecret);
    setApi(initApi);
  }, []);

  useEffect(() => {
    if (api) {
      api.tracks.audioAnalysis("7hQJA50XrCWABAu5v6QZ4i").then((res) => {
        setSegments(res.segments);
      });
    }
  }, [api]);

  //   const getToken = async () => {
  //     const res = await fetch("https://accounts.spotify.com/api/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  //     });
  //     const data = await res.json();
  //     setAuthToken(data.access_token);
  //   };

  return (
    <div className="w-full">
      <button className="text-white" onClick={() => console.log(segments)}>
        Log Segments
      </button>
      {segments && <LoudnessClock events={segments} />}
    </div>
  );
};

export default Player;
