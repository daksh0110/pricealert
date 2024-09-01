import React from "react";
import styled from "styled-components";

const CloseButtonIcon = () => {
  const Svg = styled.svg`
    height: 1.5rem;
    position: absolute;
    top: 16px;
    right: 25px;
    color: black;
  `;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/Sbg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </Svg>
  );
};

export default CloseButtonIcon;
