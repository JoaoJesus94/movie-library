import { FaTwitter, FaLinkedin, FaGithub, FaHashtag } from 'react-icons/fa'

export function Footer() {
	return (
		<footer>
			<div className="layout-rules footer items-center py-4">
				<div className="items-center grid-flow-col">
					<FaHashtag size={36} />
					<p>Handcrafted by João Jesus</p>
				</div>
				<div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
					<a href="https://twitter.com/JoaoJesus_94" target="_blank" rel="noreferrer">
						<FaTwitter size={24} />
					</a>
					<a href="https://github.com/JoaoJesus94" target="_blank" rel="noreferrer">
						<FaGithub size={24} />
					</a>
					<a href="https://www.linkedin.com/in/joaojesus94" target="_blank" rel="noreferrer">
						<FaLinkedin size={24} />
					</a>
				</div>
			</div>
		</footer>
	)
}
