//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Base64} from "./libraries/Base64.sol";

import "hardhat/console.sol";

contract AstroNFT is ERC721URIStorage {
    // Keep Track of tokenIds that have been minted
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: sans-serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] tools = [
        "BLASTER",
        "SHIELD",
        "GRAPLING HOOK",
        "FLAG",
        "WELDER",
        "FLOWER"
    ];
    string[] rockets = [
        "FALCON 9",
        "STARSHIP",
        "NEW GLEN",
        "NEW SHEPARD",
        "DRAGON",
        "FALCON HEAVY"
    ];
    string[] countries = [
        "USA",
        "RUSSA",
        "CHINA",
        "CANADA",
        "FRANCE",
        "ENGLAND"
    ];

    event NewAstroNFTMinted(address sender, uint256 tokenId);

    function pickRandomTool(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("TOOL", Strings.toString(tokenId)))
        );
        // Squash the number betweeen 0 and the length of the array to avoid bounds
        rand = rand % tools.length;
        return tools[rand];
    }

    function pickRandomRocket(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("ROCKET", Strings.toString(tokenId)))
        );
        // Squash the number betweeen 0 and the length of the array to avoid bounds
        rand = rand % rockets.length;
        return rockets[rand];
    }

    function pickRandomCountry(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("COUNTRIY", Strings.toString(tokenId)))
        );
        // Squash the number betweeen 0 and the length of the array to avoid bounds
        rand = rand % countries.length;
        return countries[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // Pass the name of the NFTs token and it's symbol
    constructor() ERC721("AstrosNFT", "ASTRO") {
        console.log("Astros NFT Contract");
    }

    // Function that the user hits to mint a new token
    function mintAnAstro() public {
        // Get the current tokenId, starting at 0
        uint256 newItemId = _tokenIds.current();

        // Get one word from each array
        string memory tool = pickRandomTool(newItemId);
        string memory rocket = pickRandomRocket(newItemId);
        string memory country = pickRandomCountry(newItemId);
        string memory combinedWord = string(
            abi.encodePacked(tool, " ", rocket, " ", country)
        );

        string memory finalSvg = string(
            abi.encodePacked(
                baseSvg,
                tool,
                " ",
                rocket,
                " ",
                country,
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "Your explorer to the stars.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        console.log(json);

        console.log(finalSvg);

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        // Mint the the NFT to the sender using msg.sender
        _safeMint(msg.sender, newItemId);

        // Set the NFT's data

        // Name SVG
        // _setTokenURI(
        //     newItemId,
        //     "data:application/json;base64,ewogICAgIm5hbWUiOiAiQXN0cm8gT25lIiwKICAgICJkZXNjcmlwdGlvbiI6ICJUaGUgYmVzdCBhc3RybyBpbiB0aGUgVW5pdmVyc2UiLAogICAgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVc1WlRXbHVJRzFsWlhRaUlIWnBaWGRDYjNnOUlqQWdNQ0F6TlRBZ016VXdJajRLSUNBZ0lEeHpkSGxzWlQ0dVltRnpaU0I3SUdacGJHdzZJSGRvYVhSbE95Qm1iMjUwTFdaaGJXbHNlVG9nYzJWeWFXWTdJR1p2Ym5RdGMybDZaVG9nTVRSd2VEc2dmVHd2YzNSNWJHVStDaUFnSUNBOGNtVmpkQ0IzYVdSMGFEMGlNVEF3SlNJZ2FHVnBaMmgwUFNJeE1EQWxJaUJtYVd4c1BTSmliR0ZqYXlJZ0x6NEtJQ0FnSUR4MFpYaDBJSGc5SWpVd0pTSWdlVDBpTlRBbElpQmpiR0Z6Y3owaVltRnpaU0lnWkc5dGFXNWhiblF0WW1GelpXeHBibVU5SW0xcFpHUnNaU0lnZEdWNGRDMWhibU5vYjNJOUltMXBaR1JzWlNJK1JHOXdaVWhoY0hCNVEyOXZiRHd2ZEdWNGRENEtQQzl6ZG1jKyIKfQo="
        // );

        // From Tutorial
        // _setTokenURI(
        //     newItemId,
        //     "data:application/json;base64,ewogICAgIm5hbWUiOiAiRXBpY0xvcmRIYW1idXJnZXIiLAogICAgImRlc2NyaXB0aW9uIjogIkFuIE5GVCBmcm9tIHRoZSBoaWdobHkgYWNjbGFpbWVkIHNxdWFyZSBjb2xsZWN0aW9uIiwKICAgICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSEJ5WlhObGNuWmxRWE53WldOMFVtRjBhVzg5SW5oTmFXNVpUV2x1SUcxbFpYUWlJSFpwWlhkQ2IzZzlJakFnTUNBek5UQWdNelV3SWo0TkNpQWdJQ0E4YzNSNWJHVStMbUpoYzJVZ2V5Qm1hV3hzT2lCM2FHbDBaVHNnWm05dWRDMW1ZVzFwYkhrNklITmxjbWxtT3lCbWIyNTBMWE5wZW1VNklERTBjSGc3SUgwOEwzTjBlV3hsUGcwS0lDQWdJRHh5WldOMElIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaUlHWnBiR3c5SW1Kc1lXTnJJaUF2UGcwS0lDQWdJRHgwWlhoMElIZzlJalV3SlNJZ2VUMGlOVEFsSWlCamJHRnpjejBpWW1GelpTSWdaRzl0YVc1aGJuUXRZbUZ6Wld4cGJtVTlJbTFwWkdSc1pTSWdkR1Y0ZEMxaGJtTm9iM0k5SW0xcFpHUnNaU0krUlhCcFkweHZjbVJJWVcxaWRYSm5aWEk4TDNSbGVIUStEUW84TDNOMlp6ND0iCn0="
        // );

        // Astro SVG
        // _setTokenURI(
        //     newItemId,
        //     "data:application/json;base64,ewogICAgIm5hbWUiOiAiQXN0cm8gT25lIiwKICAgICJkZXNjcmlwdGlvbiI6ICJUaGUgYmVzdCBhc3RybyBpbiB0aGUgVW5pdmVyc2UiLAogICAgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QnBaRDBpVEdGNVpYSmZNU0lnWkdGMFlTMXVZVzFsUFNKTVlYbGxjaUF4SWlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTNPQzQzTkNBNE15NDBNU0krUEhCaGRHZ2daRDBpVFRjd0xqTXhMRFV5TGpReGRpMDBZUzQzT0M0M09Dd3dMREFzTUMwdU1UVXRMalExTERNeExqRXlMRE14TGpFeUxEQXNNQ3d3TERZdU5EZ3RNVGt1TkRKak1DMHhOUzR4TFRFMkxqYzRMVEU1TGpjNUxUSXlMamc1TFRFNUxqYzVVek13TGpnMkxERXpMalEzTERNd0xqZzJMREk0TGpVM1lUTXhMakk0TERNeExqSTRMREFzTUN3d0xEWXVOamdzTVRrdU5qY3VOalV1TmpVc01Dd3dMREFzTUN3dU1uWTBMakkzWVRJeExqWTFMREl4TGpZMUxEQXNNQ3d3TFRFM0xqWXlMREl6YkRFdU1UY3NNVFV1TURoaE1TNDFOaXd4TGpVMkxEQXNNQ3d3TERFdU5UVXNNUzQwTkVnMk9DNDVNMEV4TlM0ME5pd3hOUzQwTml3d0xEQXNNQ3c0TkM0ek9DdzNOaTQzTWxZMk55NDRNVUV4TlM0ME55d3hOUzQwTnl3d0xEQXNNQ3czTUM0ek1TdzFNaTQwTVZwTk9ESXVPREVzTnpBdU1uWTJMalV5WVRFekxqa3NNVE11T1N3d0xEQXNNUzB4TXk0NE9Dd3hNeTQ1U0RRMkxqQTVWamM1TGpjM1lTNDROaTQ0Tml3d0xEQXNNU3d1T0RZdExqZzJTRFkxTGpBMllUSXVOQ3d5TGpRc01Dd3dMREFzTWk0eE9TMHhMalUzWXk0Mk1TMHhMalUxTERNdU5DMHhMalF6TERNdU5ETXRNUzQwTW1FdU56Z3VOemdzTUN3eExEQXNMakV0TVM0MU5tTXRMakUyTERBdE5DMHVNak10TlN3eUxqUXhZUzQ0TWk0NE1pd3dMREFzTVMwdU56TXVOVGRJTkRkaE1pNDBNeXd5TGpRekxEQXNNQ3d3TFRJdU5ESXNNaTQwTTNZdU5EZHNMVFV1TkRZc01XRXhNUzQyT1N3eE1TNDJPU3d3TERBc01DMDNMall4TERRdU9USnNMUzQ1TFRjdU1EZGhNemN1Tmpnc016Y3VOamdzTUN3d0xERXNNQzA1TGpBMll6RXVNVEV0T1M0d09TdzBMalkyTFRFd0xqWTVMRFF1TnpVdE1UQXVOek5oTGpjNExqYzRMREFzTUN3d0xTNDFOUzB4TGpRMll5MHVNVGd1TURZdE5DNDFMREV1TnpVdE5TNDNOU3d4TWtFek9DNDNPQ3d6T0M0M09Dd3dMREFzTUN3eU9TdzNPUzR5Tld3eExqRTVMRGt1TXpGQk1URXVOaklzTVRFdU5qSXNNQ3d3TERBc01qa3VOelVzT1RCaE1TNDROaXd4TGpnMkxEQXNNQ3d3TERBc0xqWXlTREl5TGpZeFRESXhMalEwTERjMUxqVTFZVEl3TGpBNExESXdMakE0TERBc01Dd3hMREl3TFRJeExqWTBTRFk0TGprellURXpMamczTERFekxqZzNMREFzTUN3eExERXhMalEwTERaQk5TNDBNaXcxTGpReUxEQXNNQ3d3TERneUxqZ3hMRGN3TGpKYVRUTXhMak14TERrd0xqVTFZUzR5TGpJc01Dd3dMREVzTUMwdU1UZ3NPUzQzT1N3NUxqYzVMREFzTUN3eExDNDFNeTB4TGpZeExERXdMakV5TERFd0xqRXlMREFzTUN3eExEY3VOVFF0Tm13MUxqRTVMUzQ1TW5ZNExqYzVTRE14TGpRM1FTNHhPUzR4T1N3d0xEQXNNU3d6TVM0ek1TdzVNQzQxTlZwTk5ETXNNVGhoTlRVdU5UTXNOVFV1TlRNc01Dd3dMREVzTWpJdU1Ua3VNRGdzTVRFdU56TXNNVEV1TnpNc01Dd3dMREVzT1M0ek5Td3hNUzQwT1hZdU1UUmhNVEV1TnpRc01URXVOelFzTUN3d0xERXRPUzQ0TVN3eE1TNDFPQ3cyTlM0ME55dzJOUzQwTnl3d0xEQXNNUzB4TUM0NE1pNDVMRFkxTGpNekxEWTFMak16TERBc01Dd3hMVEV3TGpRMExTNDROR3d0TGpjdExqRXhZVEV4TGpjMExERXhMamMwTERBc01Dd3hMUzQwTlMweU15NHhNVnB0TFRRc016UXVNelpXTkRrdU1qSklOamd1TnpWMk15NHhNa2d6T1M0d05sb2lJSFJ5WVc1elptOXliVDBpZEhKaGJuTnNZWFJsS0MwNUlDMDRMamM0S1NJdlBqeGphWEpqYkdVZ1kzZzlJalF3TGpJeUlpQmplVDBpTnpRdU1EUWlJSEk5SWpFdU5UWWlMejQ4WTJseVkyeGxJR040UFNJek15NHhPU0lnWTNrOUlqUTVMamd5SWlCeVBTSXhMalUySWk4K1BHTnBjbU5zWlNCamVEMGlNek11TVRraUlHTjVQU0kxTmk0NE5TSWdjajBpTVM0MU5pSXZQanhqYVhKamJHVWdZM2c5SWpNekxqRTVJaUJqZVQwaU5qTXVPRGdpSUhJOUlqRXVOVFlpTHo0OFkybHlZMnhsSUdONFBTSTBNQzR5TWlJZ1kzazlJamM0TGpjeUlpQnlQU0l4TGpVMklpOCtQSEJoZEdnZ1pEMGlUVEkwTGpBMkxEUTRMakEyWXpFdU5ETXRNUzR5TVN3eUxqSTBMVEl1TkRrc01TNDNPQzB6TGpZeUxTNHpMUzQzTWkweExqSXRNUzQxTWkwekxqYzFMVEV1TXpSaE5pNDFNaXcyTGpVeUxEQXNNQ3d3TFRFeExEUXVORFJqTFRJdU1USXNNUzQzTXkweUxqSXlMRE10TVM0NU1Td3pMamN5Y3pFc01TNHpOeXd6TERFdU16ZHNMamNzTUN3dU1qWXNNR0UyTGpVeExEWXVOVEVzTUN3d0xEQXNNVEF1T1RNdE5DNDFNVnB0TGpNekxUTmpMakEzTGpFNExTNHhMalUzTFM0MU5Dd3hMakEzWVRZdU5EZ3NOaTQwT0N3d0xEQXNNQzB1TlRndE1TNDBORU15TkN3ME5DNDNNaXd5TkM0ek5DdzBOQzQ1TERJMExqTTVMRFExV20wdE5pNDROQzB5TGpKaE5TdzFMREFzTUN3eExEUXVPVFFzTkM0ME55d3lNQzR4TERJd0xqRXNNQ3d3TERFdE5DNHlPQ3d5TGpNekxESXdMakUzTERJd0xqRTNMREFzTUN3eExUUXVOU3d4TGpJNUxEUXVPVEVzTkM0NU1Td3dMREFzTVMweExqRXlMVE11TVROQk5TdzFMREFzTUN3eExERTNMalUxTERReUxqZ3pXbTB0Tnl3M0xqZzBZeTB1TURZdExqRTBMakE0TFM0MU55NDJPQzB4TGpJeFlUWXVORE1zTmk0ME15d3dMREFzTUN3dU5qWXNNUzQyUXpFeExEVXhMREV3TGpZeUxEVXdMamM0TERFd0xqVTRMRFV3TGpZM1dtMDNMREl1TURoaE5DNDRPU3cwTGpnNUxEQXNNQ3d4TFRJdU1qVXRMalUxTERJekxqZzBMREl6TGpnMExEQXNNQ3d3TERjdE1pNDROMEUxTERVc01Dd3dMREVzTVRjdU5UVXNOVEl1TnpWYUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0T1NBdE9DNDNPQ2tpTHo0OGNHRjBhQ0JrUFNKTk1Ua3VNemNzTVRVdU9XRTFMalV5TERVdU5USXNNQ3d3TERFc01pd3lMQzQ0TWk0NE1pd3dMREFzTUN3eExqUTBMREFzTlM0MU1pdzFMalV5TERBc01Dd3hMREl0TWl3dU9ETXVPRE1zTUN3d0xEQXNNQzB4TGpRMUxEVXVOak1zTlM0Mk15d3dMREFzTVMweUxUSXNMamd5TGpneUxEQXNNQ3d3TFRFdU5EUXNNQ3cxTGpZekxEVXVOak1zTUN3d0xERXRNaXd5UVM0NE15NDRNeXd3TERBc01Dd3hPUzR6Tnl3eE5TNDVXaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xUa2dMVGd1TnpncElpOCtQSEJoZEdnZ1pEMGlUVGczTGpNeExEUTNZVFV1TkRjc05TNDBOeXd3TERBc01TMHlMVElzTGpneUxqZ3lMREFzTUN3d0xURXVORFFzTUN3MUxqUTNMRFV1TkRjc01Dd3dMREV0TWl3eUxDNDRNeTQ0TXl3d0xEQXNNQ3d3TERFdU5EVXNOUzQwTnl3MUxqUTNMREFzTUN3eExESXNNaXd1T0RJdU9ESXNNQ3d3TERBc01TNDBOQ3d3TERVdU5EY3NOUzQwTnl3d0xEQXNNU3d5TFRKQkxqZ3pMamd6TERBc01Dd3dMRGczTGpNeExEUTNXaUlnZEhKaGJuTm1iM0p0UFNKMGNtRnVjMnhoZEdVb0xUa2dMVGd1TnpncElpOCtQSEJoZEdnZ1pEMGlUVFl3TGpBNUxEVTJMakkxU0RRNExqVmhNUzQyTWl3eExqWXlMREFzTUN3d0xURXVOaklzTVM0Mk0zWTJMamxoTVM0Mk1pd3hMall5TERBc01Dd3dMREV1TmpJc01TNDJNMGcyTUM0d09XRXhMall6TERFdU5qTXNNQ3d3TERBc01TNDJNeTB4TGpZemRpMDJMamxCTVM0Mk15d3hMall6TERBc01Dd3dMRFl3TGpBNUxEVTJMakkxV20wdU1EY3NPQzQxTTJFdU1EY3VNRGNzTUN3d0xERXRMakEzTGpBMlNEUTRMalZoTGpBMkxqQTJMREFzTUN3eExTNHdOaTB1TURaMkxUWXVPV0V1TURjdU1EY3NNQ3d3TERFc0xqQTJMUzR3TjBnMk1DNHdPV0V1TURjdU1EY3NNQ3d3TERFc0xqQTNMakEzV2lJZ2RISmhibk5tYjNKdFBTSjBjbUZ1YzJ4aGRHVW9MVGtnTFRndU56Z3BJaTgrUEhCaGRHZ2daRDBpVFRRMExqWTVMRE01TGpnNWJDNDRPUzR4TTJNdU5UVXVNRGdzTVM0d09TNHhOaXd4TGpZMExqSXlhREJoTVRJdU5EZ3NNVEl1TkRnc01Dd3dMREV0TlM0NE15MHhNQzQxTlN3eE1pNHpNU3d4TWk0ek1Td3dMREFzTVN3dU5USXRNeTQxTm1NMUxqYzRMUzR4T0N3NUxqRTRMVEl1TWpZc01URXVNVFV0TkM0ek5pd3hMamd4TERFdU1qTXNOUzR6TkN3eUxqVXpMREV5TGpFeExESXVOVGRoTVRJdU5ETXNNVEl1TkRNc01Dd3dMREV0TkM0Mk1Td3hOUzQ1VERZeUxqSXpMRFF3WXk0ME1pMHVNRFl1T0RRdExqRXhMREV1TWpVdExqRTRiQzR4T1N3d1lURTBMREUwTERBc01Dd3dMUzR6TVMweU1DNDBPV3d0TGpFdExqRXhMVEV1TmpJdExqSTVMVEV1TVRrdExqRTJMUzQyTnkwdU1EbGpMVEV1TkRrdExqRTRMVE10TGpJNUxUUXVORGd0TGpNekxURXNNQzB5TERBdE15d3djUzB5TGpFekxqQTRMVFF1TWpZdU16TnNMUzR5TkN3d1l5MHVOVFV1TURjdE1TNHdPUzR4TkMweExqWXpMakl6Y3kweExqQTJMakUzTFRFdU5pNHlPR013TERBdExqQTNMakE0TFM0eE1pNHhNbUV4TkN3eE5Dd3dMREFzTUMwdU1qZ3NNakF1TkRsYUlpQjBjbUZ1YzJadmNtMDlJblJ5WVc1emJHRjBaU2d0T1NBdE9DNDNPQ2tpTHo0OEwzTjJaejQ9Igp9Cg"
        // );

        // Link Test Broken
        // _setTokenURI(newItemId, "https://www.astros.xyz/astro" + newItemId);

        // Random Words
        // Link Test Broken
        _setTokenURI(newItemId, finalTokenUri);

        console.log(
            "Minted Astro with id of %s and sent to %s",
            newItemId,
            msg.sender
        );

        // Increment the counter when the next NFT is minted
        _tokenIds.increment();

        emit NewAstroNFTMinted(msg.sender, newItemId);
    }
}
