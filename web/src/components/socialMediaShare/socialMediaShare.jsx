import {FacebookShareButton, FacebookIcon, TwitterShareButton, XIcon} from "react-share";

const FaceBookShareBtn = ({faceBookShareInfo, twitterShareInfo}) => {
    return(
        <FacebookShareButton 
            url={`${faceBookShareInfo?.url}`}
            quote={`${faceBookShareInfo?.quote}`}
            hashtag={`#${faceBookShareInfo?.hashtag}`}
            className={``}>
            <FacebookIcon size={36} />
        </FacebookShareButton>
    )
}

const TwitterShareBtn = ({twitterShareInfo}) => {
    return(
        <TwitterShareButton
            url={twitterShareInfo?.url}
            title={twitterShareInfo?.title}
            hashtag={`#${twitterShareInfo?.hashtag}`}
            className={``}
        >
          <XIcon size={32} round />
        </TwitterShareButton>
    )
}

const SocialMediaShare = ({faceBookShareInfo, twitterShareInfo}) => {

  return(
    <>
      <FaceBookShareBtn faceBookShareInfo={faceBookShareInfo} />
      <TwitterShareBtn twitterShareInfo={twitterShareInfo} />
    </>
  )

}

export default SocialMediaShare;