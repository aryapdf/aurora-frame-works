import { useState, useEffect } from "react";

interface PreloaderConfig {
    images?: string[];
    fonts?: string[];
    videos?: string[];
}

export const useAssetPreloader = (config: PreloaderConfig) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalAssets =
            (config.images?.length || 0) +
            (config.fonts?.length || 0) +
            (config.videos?.length || 0);

        if (totalAssets === 0) {
            setLoading(false);
            return
        }

        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++
            setProgress(Math.round((loadedCount/totalAssets) * 100));

            if (loadedCount === totalAssets) {
                setTimeout(() => setLoading(false), 500)
            }
        }

        config.images?.forEach(image => {
            const img = new Image();
            img.onload = updateProgress;
            img.onerror = updateProgress;
            img.src = image;
        })

        config.fonts?.forEach(font => {
            document.fonts.load(font).then(updateProgress).catch(updateProgress);
        })

        config.videos?.forEach(video => {
            const video = document.createElement('video');
            video.onloadeddata = updateProgress;
            video.onerror = updateProgress;
            video.src = video;
            video.preload = 'auto';
        })
    }, [config]);

    return { loading, progress };
}