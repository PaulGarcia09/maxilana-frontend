import React, { FC } from 'react';
import Image from 'next/image';
import useToggleState from '~/hooks/useToggleState';
import styles from './YouTube.module.css';

interface Props {
  url: string;
}

function getYoutubeVideoIDFromUrl(url: string): string | null {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : null;
}

const YouTube: FC<Props> = ({ url }) => {
  const [showPlayer, togglePlayer] = useToggleState();
  const id = getYoutubeVideoIDFromUrl(url);
  const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
  return (
    <div className={styles.root}>
      {showPlayer ? (
        <iframe
          className={styles.player}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image src={thumbnail} layout="fill" objectFit="contain" alt="id" />
          <span className={styles.play} role="button" onClick={() => togglePlayer()} />
        </>
      )}
    </div>
  );
};

export default YouTube;
