export interface PixabayImageData {
	id: number;
	pageURL: string;
	type: string;
	tags: string;
	previewURL: string;
	previewWidth: number;
	previewHeight: number;
	webformatURL: string;
	webformatWidth: number;
	webformatHeight: number;
	largeImageURL: string;
	imageWidth: number;
	imageHeight: number;
	imageSize: number;
	views: number;
	downloads: number;
	collections: number;
	likes: number;
	comments: number;
	user_id: number;
	user: string;
	userImageURL: string;
};

class PixabayAPI {
	private static baseURL = 'https://pixabay.com/api/?key=24425557-ee9ef3347eeda67a88e5e8ad0';

	public static async GetImagesByKeyword(keyword: string) {
		const url = `${this.baseURL}&q=${keyword}`;
		const res = await fetch(url);
		let data = await res.json();
		if (data.hits.length > 0) {
			data = data.hits.slice(0, 5);
			data = data.map((imageData: PixabayImageData) => {
				return imageData.webformatURL
			});
			return data;
		};
		return [];
	}
};

export default PixabayAPI;