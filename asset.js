let Asset = {};

Asset.assets = [];

Asset.images = {};

Asset.loadAssets = function(onComplete) {
    let total = Asset.assets.length;
    let loadCount = 0;
    const onLoad = function() {
        loadCount++;
        if (loadCount >= total) {
            onComplete();
        }
    };

    Asset.assets.forEach(asset => {
        switch (asset.type) {
            case 'image':
                Asset._loadImage(asset, onLoad);
                break;
        }
    });
};

Asset._loadImage = function(asset, onLoad) {
    let image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};