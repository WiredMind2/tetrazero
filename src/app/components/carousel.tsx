const Carousel: React.FC = () => {
	// const story = [
	// 	'You might have guessed it already,',
	// 	'But this is the main page.',
	// 	'(Obviously)',
	// 	'And there\'s mostly nothing here.',
	// 	'Do I look like I know web design?',
	// 	'Absurd.',
	// 	'Of course I don\'t.',
	// 	'That\'s why there are only shades of grey.',
	// 	'So here I am,',
	// 	'Making a bunch of animations.',
	// 	'Even thought I have no idea what I\'m doing.',
	// 	'Why?',
	// 	'Just because I can.',
	// 	'Thank you for your time.',
	// 	'Bye!',
	// 	'There\'s nothing after that.',
	// 	'No need to keep scrolling.',
	// 	'Just stop.',
	// 	'Stop??',
	// 	'Oh whatever.',
	// 	'Happy now?'

	// ]

	const story = [
		'Hi! Welcome to my website!',
		'As you can see, there isn\'t much here.',
		'I\'ve made this website mostly to learn about web development, and to try some cool web libraries!',
		'Please check out my other projects as well!',
		'There is a manga app on this website, and I\'ve got much more on my GitHub!',
		'See you around!',
	]

	return (
		<>
			{story.map((obj, i) => (
				<div className='carousel_slide' key={i}>
					<h1>{obj}</h1>
				</div>
			))}
		</>
	);
};

export default Carousel