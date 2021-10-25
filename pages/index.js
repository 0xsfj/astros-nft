import React, { useEffect, useState } from 'react';
import { Text, Box, Button, Flex, Image, Link, Heading, Stack, Icon, IconButton, useDisclosure, HStack, Menu, MenuButton, Avatar, useColorModeValue, Tooltip, Container, Grid, useToast } from '@chakra-ui/react';
import { ExternalLinkIcon, HamburgerIcon, CloseIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { BiWalletAlt } from 'react-icons/bi';
import astroNftAbi from '../artifacts/contracts/AstroNFT.sol/AstroNFT.json';
import { ethers } from 'ethers';

const OpenseaIcon = (props) => (
  <Icon viewBox="0 0 90 90" {...props}>
    <path d="M90 45C90 69.8514 69.8514 90 45 90C20.1486 90 0 69.8514 0 45C0 20.1486 20.1486 0 45 0C69.8566 0 90 20.1486 90 45Z" fill="#2081E2" />
    <path
      d="M22.2011 46.512L22.3953 46.2069L34.1016 27.8939C34.2726 27.6257 34.6749 27.6535 34.8043 27.9447C36.76 32.3277 38.4475 37.7786 37.6569 41.1721C37.3194 42.5683 36.3948 44.4593 35.3545 46.2069C35.2204 46.4612 35.0725 46.7109 34.9153 46.9513C34.8413 47.0622 34.7165 47.127 34.5824 47.127H22.5432C22.2196 47.127 22.0301 46.7756 22.2011 46.512Z"
      fill="white"
    />
    <path
      d="M74.38 49.9149V52.8137C74.38 52.9801 74.2783 53.1281 74.1304 53.1928C73.2242 53.5812 70.1219 55.0052 68.832 56.799C65.5402 61.3807 63.0251 67.932 57.4031 67.932H33.949C25.6362 67.932 18.9 61.1727 18.9 52.8322V52.564C18.9 52.3421 19.0803 52.1618 19.3023 52.1618H32.377C32.6359 52.1618 32.8255 52.4022 32.8024 52.6565C32.7099 53.5072 32.8671 54.3764 33.2693 55.167C34.0461 56.7435 35.655 57.7283 37.3934 57.7283H43.866V52.675H37.4673C37.1391 52.675 36.9449 52.2959 37.1345 52.0277C37.2038 51.9214 37.2824 51.8104 37.3656 51.6856C37.9713 50.8257 38.8358 49.4895 39.6958 47.9684C40.2829 46.9421 40.8516 45.8463 41.3093 44.746C41.4018 44.5472 41.4758 44.3438 41.5497 44.1449C41.6746 43.7936 41.804 43.4653 41.8965 43.1371C41.9889 42.8597 42.0629 42.5684 42.1369 42.2956C42.3542 41.3617 42.4467 40.3723 42.4467 39.3459C42.4467 38.9437 42.4282 38.523 42.3912 38.1207C42.3727 37.6815 42.3172 37.2423 42.2617 36.8031C42.2247 36.4147 42.1554 36.031 42.0814 35.6288C41.9889 35.0416 41.8595 34.4591 41.7115 33.8719L41.6607 33.65C41.5497 33.2478 41.4573 32.864 41.3278 32.4618C40.9626 31.1996 40.5418 29.9698 40.098 28.8186C39.9362 28.3609 39.7512 27.9217 39.5663 27.4825C39.2935 26.8213 39.0161 26.2203 38.7619 25.6516C38.6324 25.3927 38.5214 25.1569 38.4105 24.9165C38.2857 24.6437 38.1562 24.371 38.0268 24.112C37.9343 23.9132 37.8279 23.7283 37.754 23.5434L36.9634 22.0824C36.8524 21.8836 37.0374 21.6478 37.2546 21.7079L42.2016 23.0487H42.2155C42.2247 23.0487 42.2294 23.0533 42.234 23.0533L42.8859 23.2336L43.6025 23.437L43.866 23.511V20.5706C43.866 19.1512 45.0034 18 46.4089 18C47.1116 18 47.7496 18.2866 48.2073 18.7536C48.665 19.2206 48.9517 19.8586 48.9517 20.5706V24.935L49.4787 25.0829C49.5204 25.0968 49.562 25.1153 49.599 25.143C49.7284 25.2401 49.9133 25.3835 50.1491 25.5591C50.3341 25.7071 50.5329 25.8874 50.7733 26.0723C51.2495 26.4561 51.8181 26.9508 52.4423 27.5194C52.6087 27.6628 52.7706 27.8107 52.9185 27.9587C53.723 28.7076 54.6245 29.5861 55.4845 30.557C55.7249 30.8297 55.9607 31.1071 56.2011 31.3984C56.4415 31.6943 56.6958 31.9856 56.9177 32.2769C57.209 32.6652 57.5233 33.0674 57.7961 33.4882C57.9256 33.687 58.0735 33.8904 58.1984 34.0892C58.5497 34.6209 58.8595 35.1711 59.1554 35.7212C59.2802 35.9755 59.4097 36.2529 59.5206 36.5257C59.8489 37.2608 60.1078 38.0098 60.2742 38.7588C60.3251 38.9206 60.3621 39.0963 60.3806 39.2535V39.2904C60.436 39.5124 60.4545 39.7482 60.473 39.9886C60.547 40.756 60.51 41.5235 60.3436 42.2956C60.2742 42.6239 60.1818 42.9336 60.0708 43.2619C59.9598 43.5763 59.8489 43.9045 59.7056 44.2143C59.4282 44.8569 59.0999 45.4996 58.7115 46.1006C58.5867 46.3225 58.4388 46.5583 58.2908 46.7802C58.129 47.016 57.9626 47.238 57.8146 47.4553C57.6112 47.7327 57.3939 48.0239 57.172 48.2828C56.9732 48.5556 56.7697 48.8284 56.5478 49.0688C56.2381 49.434 55.9422 49.7808 55.6324 50.1137C55.4475 50.331 55.2487 50.5529 55.0452 50.7517C54.8464 50.9736 54.643 51.1724 54.4581 51.3573C54.1483 51.6671 53.8894 51.9075 53.6721 52.1063L53.1635 52.5733C53.0896 52.638 52.9925 52.675 52.8908 52.675H48.9517V57.7283H53.9079C55.0175 57.7283 56.0716 57.3353 56.9223 56.6141C57.2136 56.3598 58.485 55.2594 59.9876 53.5997C60.0384 53.5442 60.1032 53.5026 60.1771 53.4841L73.8668 49.5265C74.1211 49.4525 74.38 49.6467 74.38 49.9149Z"
      fill="white"
    />
  </Icon>
);

const AstrosIcon = (props) => (
  <Icon viewBox="0 0 78.74 83.41" {...props}>
    <path
      fill="white"
      d="M70.31,52.41v-4a.78.78,0,0,0-.15-.45,31.12,31.12,0,0,0,6.48-19.42c0-15.1-16.78-19.79-22.89-19.79S30.86,13.47,30.86,28.57a31.28,31.28,0,0,0,6.68,19.67.65.65,0,0,0,0,.2v4.27a21.65,21.65,0,0,0-17.62,23l1.17,15.08a1.56,1.56,0,0,0,1.55,1.44H68.93A15.46,15.46,0,0,0,84.38,76.72V67.81A15.47,15.47,0,0,0,70.31,52.41ZM82.81,70.2v6.52a13.9,13.9,0,0,1-13.88,13.9H46.09V79.77a.86.86,0,0,1,.86-.86H65.06a2.4,2.4,0,0,0,2.19-1.57c.61-1.55,3.4-1.43,3.43-1.42a.78.78,0,1,0,.1-1.56c-.16,0-4-.23-5,2.41a.82.82,0,0,1-.73.57H47a2.43,2.43,0,0,0-2.42,2.43v.47l-5.46,1a11.69,11.69,0,0,0-7.61,4.92l-.9-7.07a37.68,37.68,0,0,1,0-9.06c1.11-9.09,4.66-10.69,4.75-10.73a.78.78,0,0,0-.55-1.46c-.18.06-4.5,1.75-5.75,12A38.78,38.78,0,0,0,29,79.25l1.19,9.31A11.62,11.62,0,0,0,29.75,90a1.86,1.86,0,0,0,0,.62H22.61L21.44,75.55a20.08,20.08,0,0,1,20-21.64H68.93a13.87,13.87,0,0,1,11.44,6A5.42,5.42,0,0,0,82.81,70.2ZM31.31,90.55a.2.2,0,0,1,0-.18,9.79,9.79,0,0,1,.53-1.61,10.12,10.12,0,0,1,7.54-6l5.19-.92v8.79H31.47A.19.19,0,0,1,31.31,90.55ZM43,18a55.53,55.53,0,0,1,22.19.08,11.73,11.73,0,0,1,9.35,11.49v.14a11.74,11.74,0,0,1-9.81,11.58,65.47,65.47,0,0,1-10.82.9,65.33,65.33,0,0,1-10.44-.84l-.7-.11a11.74,11.74,0,0,1-.45-23.11Zm-4,34.36V49.22H68.75v3.12H39.06Z"
      transform="translate(-9 -8.78)"
    />
    <circle fill="white" cx="40.22" cy="74.04" r="1.56" />
    <circle fill="white" cx="33.19" cy="49.82" r="1.56" />
    <circle fill="white" cx="33.19" cy="56.85" r="1.56" />
    <circle fill="white" cx="33.19" cy="63.88" r="1.56" />
    <circle fill="white" cx="40.22" cy="78.72" r="1.56" />
    <path
      d="M24.06,48.06c1.43-1.21,2.24-2.49,1.78-3.62-.3-.72-1.2-1.52-3.75-1.34a6.52,6.52,0,0,0-11,4.44c-2.12,1.73-2.22,3-1.91,3.72s1,1.37,3,1.37l.7,0,.26,0a6.51,6.51,0,0,0,10.93-4.51Zm.33-3c.07.18-.1.57-.54,1.07a6.48,6.48,0,0,0-.58-1.44C24,44.72,24.34,44.9,24.39,45Zm-6.84-2.2a5,5,0,0,1,4.94,4.47,20.1,20.1,0,0,1-4.28,2.33,20.17,20.17,0,0,1-4.5,1.29,4.91,4.91,0,0,1-1.12-3.13A5,5,0,0,1,17.55,42.83Zm-7,7.84c-.06-.14.08-.57.68-1.21a6.43,6.43,0,0,0,.66,1.6C11,51,10.62,50.78,10.58,50.67Zm7,2.08a4.89,4.89,0,0,1-2.25-.55,23.84,23.84,0,0,0,7-2.87A5,5,0,0,1,17.55,52.75Z"
      transform="translate(-9 -8.78)"
      fill="white"
    />
    <path fill="white" d="M19.37,15.9a5.52,5.52,0,0,1,2,2,.82.82,0,0,0,1.44,0,5.52,5.52,0,0,1,2-2,.83.83,0,0,0,0-1.45,5.63,5.63,0,0,1-2-2,.82.82,0,0,0-1.44,0,5.63,5.63,0,0,1-2,2A.83.83,0,0,0,19.37,15.9Z" transform="translate(-9 -8.78)" />
    <path fill="white" d="M87.31,47a5.47,5.47,0,0,1-2-2,.82.82,0,0,0-1.44,0,5.47,5.47,0,0,1-2,2,.83.83,0,0,0,0,1.45,5.47,5.47,0,0,1,2,2,.82.82,0,0,0,1.44,0,5.47,5.47,0,0,1,2-2A.83.83,0,0,0,87.31,47Z" transform="translate(-9 -8.78)" />
    <path
      fill="white"
      d="M60.09,56.25H48.5a1.62,1.62,0,0,0-1.62,1.63v6.9a1.62,1.62,0,0,0,1.62,1.63H60.09a1.63,1.63,0,0,0,1.63-1.63v-6.9A1.63,1.63,0,0,0,60.09,56.25Zm.07,8.53a.07.07,0,0,1-.07.06H48.5a.06.06,0,0,1-.06-.06v-6.9a.07.07,0,0,1,.06-.07H60.09a.07.07,0,0,1,.07.07Z"
      transform="translate(-9 -8.78)"
    />
    <path
      fill="white"
      d="M44.69,39.89l.89.13c.55.08,1.09.16,1.64.22h0a12.48,12.48,0,0,1-5.83-10.55,12.31,12.31,0,0,1,.52-3.56c5.78-.18,9.18-2.26,11.15-4.36,1.81,1.23,5.34,2.53,12.11,2.57a12.43,12.43,0,0,1-4.61,15.9L62.23,40c.42-.06.84-.11,1.25-.18l.19,0a14,14,0,0,0-.31-20.49l-.1-.11-1.62-.29-1.19-.16-.67-.09c-1.49-.18-3-.29-4.48-.33-1,0-2,0-3,0q-2.13.08-4.26.33l-.24,0c-.55.07-1.09.14-1.63.23s-1.06.17-1.6.28c0,0-.07.08-.12.12a14,14,0,0,0-.28,20.49Z"
      transform="translate(-9 -8.78)"
    />
  </Icon>
);

const OPENSEA_LINK = '';
const CONTRACT_ADDRESS = '0xa5209EbD25718DD46bEf1743379c9687D6640f20';

const Links = ['Team', 'OpenSea'];

const HomePage = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  // Toasts
  const toast = useToast();

  const checkIfWalletIsConnected = async () => {
    // Check for window.ethereum
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Make sure your browser supports a wallet!');
      return;
    } else {
      console.log('Ethereum Object!', ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found account: ', account);
      setCurrentAccount(account);

      toast({
        title: `Connected to ${accounts[0].substring(0, 8)}...`,
        description: 'Congrats go ahead and mint your ASTRO',
        status: 'success',
        isClosable: true,
      });

      setupEventListener();
    } else {
      console.log('No accounts found!');
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Make sure your browser supports a wallet!');
        // Trigger a popup from Chakra-UI
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Accounts: ', accounts);

      setCurrentAccount(accounts[0]);

      toast({
        title: `Connected to ${accounts[0].substring(0, 8)}...`,
        description: 'Congrats go ahead and mint your ASTRO',
        status: 'success',
        isClosable: true,
      });

      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, astroNftAbi.abi, signer);

        connectedContract.on('NewAstroNFTMinted', (from, tokenId) => {
          console.log('New AstroNFT Minted!', from, tokenId.toNumber());
          console.log(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
        });
      } else {
        console.log('Make sure your browser supports a wallet! Ethereum object does not exist!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestMint = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, astroNftAbi.abi, signer);

        console.log(`Opening Wallet to pay gas`);
        let nftTxn = await connectedContract.mintAnAstro();

        console.log(`Gas cost: ${nftTxn.gasPrice.toString()}`);
        console.log(`Mining plase wait...`);
        setIsMinting(true);

        await nftTxn.wait();

        setIsMinting(false);
        toast({
          title: `Congrats your ASTRO has been Minted`,
          description: `See trasaction https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
          status: 'success',
          isClosable: true,
        });

        console.log(`Mined, see trasaction https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      } else {
        console.log('Make sure your browser supports a wallet! Ethereum object does not exist!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Link>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box style={{ backdropFilter: 'saturate(180%) blur(5px)' }} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton size={'md'} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={'Open Menu'} display={{ md: 'none' }} onClick={isOpen ? onClose : onOpen} />
          <HStack spacing={8} alignItems={'center'}>
            <AstrosIcon />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Tooltip hasArrow label="Connect Wallet" placement="left">
              <Button onClick={connectWallet}>
                <BiWalletAlt size={'30px'} />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" p="10">
        <Box mb="4">
          <AstrosIcon width="100%" height="6em" />
        </Box>
        <Heading as="h1" bgGradient="linear(to-l, #FCF6BA, #BF953F, #FCF6BA)" bgClip="text" fontSize="10vw" letterSpacing="10px" textTransform="uppercase" fontWeight="extrabold" mb="4">
          Astros NFT
        </Heading>
        {currentAccount === '' ? (
          <Button onClick={connectWallet} size="lg">
            Connect Wallet
          </Button>
        ) : (
          <Button onClick={requestMint} size="lg" rightIcon={<ArrowForwardIcon />} isLoading={isMinting} loadingText="Minting your Astro">
            Mint an Astro
          </Button>
        )}
      </Box>
      <Container maxW="80vw">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Box w="100%" h="10" bg="blue.500" border="2px solid #FCF6BA" borderRadius="5" overflow="hidden" display="inline-table">
            <Image src="images/Astro.png" alt="Astro" />
          </Box>
          <Box w="100%" h="10" bg="blue.500" border="2px solid #FCF6BA" borderRadius="5" overflow="hidden" display="inline-table">
            <Image src="images/Astro.png" alt="Astro" />
          </Box>
          <Box w="100%" h="10" bg="blue.500" border="2px solid #FCF6BA" borderRadius="5" overflow="hidden" display="inline-table">
            <Image src="images/Astro.png" alt="Astro" />
          </Box>
          <Box w="100%" h="10" bg="blue.500" border="2px solid #FCF6BA" borderRadius="5" overflow="hidden" display="inline-table">
            <Image src="images/Astro.png" alt="Astro" />
          </Box>
          <Box w="100%" h="10" bg="blue.500" border="2px solid #FCF6BA" borderRadius="5" overflow="hidden" display="inline-table">
            <Image src="images/Astro.png" alt="Astro" />
          </Box>
        </Grid>
      </Container>
      <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
        <Stack>
          <Stack direction="row" spacing="4" align="center" justify="space-between">
            <Link href={OPENSEA_LINK} isExternal>
              <OpenseaIcon mx="2px" /> View on Opensea
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default HomePage;
