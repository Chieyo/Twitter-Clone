import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import Post from "../../components/common/Post";

const SavesPage = () => {
	const queryClient = useQueryClient();

	const { data: savedPosts, isLoading } = useQuery({
		queryKey: ["savedPosts"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/saves/");
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				throw new Error(error.message || "Failed to load saved posts");
			}
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
			<div className='flex justify-between items-center p-4 border-b border-gray-700'>
				<p className='font-bold'>Saved Posts</p>
			</div>

			{isLoading && (
				<div className='flex justify-center h-full items-center'>
					<LoadingSpinner size='lg' />
				</div>
			)}

			{!isLoading && savedPosts?.length === 0 && (
				<div className='text-center p-4 font-bold'>No saved posts yet 🔖</div>
			)}

			{!isLoading && savedPosts?.length > 0 && (
				<div>
					{savedPosts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</div>
	);
};

export default SavesPage;
