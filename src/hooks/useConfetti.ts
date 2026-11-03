import confetti from 'canvas-confetti';

export function fireConfetti() {
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#004a80', '#5bb8fe', '#ffddb8', '#ffb95f', '#fca416', '#286198'],
  });
}

