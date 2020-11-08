insert into products(title, description, image_url, price)
  values
    (
      'T-shirt France 2020',
      'France national team t-shirt',
      'https://img1.pnghut.com/2/8/18/NKUpX4JdqY/2018-france-national-football-team-sportswear-world-cup-final.jpg',
      60
    ),
    (
      'T-shirt Germany 2020',
      'Germany national team t-shirt',
      'https://2.bp.blogspot.com/-UJLIbrWtRDo/XckpKHzzruI/AAAAAAACIzg/kLT1XfOrPP03y-v2nkLv_xAFBJ95qBi8gCLcBGAsYHQ/s738/germany-euro-2020-home-kit-5.jpg',
      50
    ),
    (
      'T-shirt Brazil 2020',
      'Brazil national team t-shirt',
      'https://www.soccerlord.se/wp-content/uploads/2016/03/Brazil-Home-Football-Shirt-2020.jpg',
      50
    );

INSERT INTO stocks (product_id, count) VALUES
	(
		'4baf3f1d-b818-4e90-be72-ef009a4eda02',
		4
	),
	(
		'20ac3d91-c2f4-494f-a2e9-8287484364d8',
		2
	),
	(
		'd7e1098a-04e2-40cc-85e3-92faa707b739',
		3
	)
