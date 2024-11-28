
const AudioPlayer = ({ audioSrc }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
            <audio controls src={audioSrc} className="w-full">
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
};

export default AudioPlayer;