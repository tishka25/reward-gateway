import React, { useEffect, useState } from 'react';
import './style.css';

export interface ExpandableAvatarProps {
    uri: string;
    expanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
}
function ExpandableAvatar(props: ExpandableAvatarProps) {
	const [expanded, setExpanded] = useState(false);

	useEffect(()=>{
		if(props.expanded !== expanded){
			setExpanded(!!props.expanded);
		}
	}, [props.expanded]);

	function getClassName() {
		return `expandableAvatarContainer ${expanded ? 'expandableAvatarContainer-expanded' : ''}`;
	}

	function toggleExpanded() {
		setExpanded(!expanded);
	}

	return (
		<div className={getClassName()} onClick={toggleExpanded}>
			<img src={'https://picsum.photos/200/300'}/>
		</div>
	);
}

export default ExpandableAvatar;
