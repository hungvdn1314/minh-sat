import { useEffect, useRef } from 'react';
import * as Phaser from 'phaser';
import { CityMapScene, MapMarkerData } from '../scenes/CityMapScene';

interface UsePhaserGameProps {
  markers: MapMarkerData[];
  onSelectLocation: (id: string) => void;
}

export const usePhaserGame = ({ markers, onSelectLocation }: UsePhaserGameProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: '#100c08',
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%',
      },
      render: {
        antialias: true,
        pixelArt: false,
      },
      scene: [CityMapScene]
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    game.scene.start('CityMapScene', {
      markers,
      onSelect: onSelectLocation
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [markers, onSelectLocation]);

  return containerRef;
};
