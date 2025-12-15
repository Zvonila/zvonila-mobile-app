import Svg, { Path, SvgProps } from 'react-native-svg';

export default function CloseIcon(props: SvgProps & { pathStroke: string }) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <Path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke={props.pathStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}