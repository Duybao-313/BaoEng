import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";

import { colors, radius } from "../../../constants/theme";

/**
 * Trinh phat video hoc lieu, phat truc tiep trong app (native controls + fullscreen).
 * Chi render khi da co URL hop le — `useVideoPlayer` tu giai phong player khi unmount
 * hoac khi `uri` thay doi (chon video khac).
 *
 * @param {{ uri: string }} props
 */
export function LessonVideoPlayer({ uri }) {
  const player = useVideoPlayer(uri, (videoPlayer) => {
    videoPlayer.loop = false;
  });

  return (
    <View style={styles.wrap}>
      <VideoView
        accessibilityLabel="Trình phát video bài học"
        style={styles.video}
        player={player}
        nativeControls
        contentFit="contain"
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.text,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
