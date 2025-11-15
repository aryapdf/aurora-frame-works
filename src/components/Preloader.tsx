import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {Progress} from "@/components/ui/progress.tsx";

interface PreloaderProps {
    progress: number;
    onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ progress, onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (progress === 100 && onComplete) {
            const tl = gsap.timeline({
                onComplete: () => onComplete()
            });

            tl.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3
            })
                .to(barRef.current, {
                    scaleX: 0,
                    duration: 0.4,
                    ease: 'power2.in'
                }, '-=0.1')
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.3
                });
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Progress Text */}
            <div
                ref={textRef}
                style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #00C8FF, #0072FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '2rem',
                    fontFamily: 'monospace',
                }}
            >
                {progress}%
            </div>

            {/* Progress Bar */}
            <div style={{
                width: 'clamp(200px, 50vw, 400px)',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <Progress value={progress} ref={barRef} className='w-inherit' />
            </div>
        </div>
    );
};

export default Preloader;