import Svg, { Path, SvgProps } from 'react-native-svg';

export default function ChevronLeftIcon(props: SvgProps & { pathStroke: string }) {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <Path d="M15 19L8 12L15 5" stroke={props.pathStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}