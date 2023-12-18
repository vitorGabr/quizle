import { Navbar } from '@/components/layout/navbar';
import { Words } from '@/components/words';
import { Stack } from 'styled-system/jsx';
import { Keyboard } from '@/components/keyboard';

export default function Home() {
  return (
    <Stack
      w="100%"
      h="100dvh"
      py="2"
      justifyContent={['center']}
      alignItems={['center']}
      gap={'10'}
      bgColor="bg.surface"
    >
      <Navbar />
      <Words />
      <Keyboard />
    </Stack>
  );
}
