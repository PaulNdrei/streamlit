/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import styled from "@emotion/styled"

export const StyledHeaderLogoTitle = styled.div(({ theme }) => ({
  position: "absolute",
  height: theme.sizes.headerHeight,
  display: "flex",
  left: "calc(3rem)",
  flexDirection: "row",
  alignItems: "center",
  "@media (max-width: 410px)": {
    left: "0",
  },
}))

export const StyledHeaderLogo = styled.span(() => ({
  "@media (max-width: 410px)": {
    display: "none",
  },
}))

export const StyledHeaderLogoImage = styled.img(() => ({
  maxWidth: "46px",
}))

export const StyledHeaderTitle = styled.span(() => ({
  marginLeft: "1rem",
  fontSize: "18px",
  color: "white",
  "@media (max-width: 320px)": {
    display: "none",
  },
}))

export const StyledHeaderSocialIcon = styled.span(() => ({
  padding: 0,
}))

const Container = styled.div(({ theme }) => ({
  paddingBottom: "4em",
  display: "flex",
  placeContent: "center",
  alignContent: "center",
  flexFlow: "row wrap",
  boxSizing: "border-box",
}))

const Link = styled.a(() => ({
  marginRight: "3em",
}))

type ImageProps = {
  customHeight?: string | null
}

const Image = styled.img<ImageProps>(({ customHeight }) => ({
  maxHeight: customHeight ?? "6em",
  margin: "0.5rem 0",
  width: "auto",
}))

type FooterCustomProps = {
  images: Array<{
    url: string
    src: string
    title: string
    alt: string
    edit?: ImageProps
  }>
}

export const FooterCustom: React.FC<FooterCustomProps> = ({ images }) => {
  return (
    <Container>
      {images.map(image => (
        <Link
          key={image.title}
          href={image.url}
          target="_blank"
          title={image.title}
        >
          <Image
            src={image.src}
            alt={image.alt}
            customHeight={image.edit?.customHeight}
          />
        </Link>
      ))}
    </Container>
  )
}
