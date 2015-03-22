/*globals dom*/
(function () {

	describe("Dom helper methods", function () {


		describe("html", function () {

			it("dom.insert", function () {
				dom.insert(
					dom.div(dom.attr('id', 'body-test')),
					dom.span()
				);

				expect(document.body.outerHTML).toContain('<div></div><span></span>');
				expect(function () {
					dom.insert(dom.span());
				}).toThrow('This method can be called only once!');

				var int = setInterval(function (done) {
					if (document.body.outerHTML.indexOf('<div id="body-test"></div><span></span>') >= 0) {
						expect(document.body.outerHTML).toContain('<div id="body-test"></div><span></span>');
						clearInterval(int);
						done();
					}
				}, 20);
			}, 200);

			it("dom.div", function () {
				var div = dom.div();
				expect(div.getHtml()).toBe('<div></div>');
			});

			it("dom.span", function () {
				var div = dom.span();
				expect(div.getHtml()).toBe('<span></span>');
			});

			it("dom.text", function () {
				var div = dom.text("Test");
				expect(div.getHtml()).toBe('Test');
			});

			it("dom.attr", function () {
				var attr = dom.attr("id", "test");
				expect(attr.elements.elements.length).toBe(0);
				expect(attr.getName()).toBe('id');
				expect(attr.getValue()).toBe('test');
			});

			it("dom.dataAttr", function () {
				var attr = dom.dataAttr("id", "test");
				expect(attr.elements.elements.length).toBe(0);
				expect(attr.getName()).toBe('data-id');
				expect(attr.getValue()).toBe('test');
			});

			describe("dom.classes", function () {

				it("basic usage", function () {
					var classes = dom.classes("circle", "red", "clickable"),
						cls = classes.getClasses();
					expect(classes.elements.elements.length).toBe(0);
					expect(cls.length).toBe(3);
					expect(cls[0]).toBe('circle');
					expect(cls[1]).toBe('red');
					expect(cls[2]).toBe('clickable');
				});

				it("get static classes", function () {
					var red = dom.contract("red"),
						clickable = dom.contract("clickable"),
						classes = dom.classes("circle", red, clickable),
						cls;

					cls = classes.getStaticClasses();

					expect(classes.elements.elements.length).toBe(0);
					expect(cls.length).toBe(1);
					expect(cls[0]).toBe('circle');
				});

			});

			it("dom.a", function () {
				var el = dom.a();
				expect(el.getHtml()).toBe('<a></a>');
			});

			it("dom.abbr", function () {
				var el = dom.abbr();
				expect(el.getHtml()).toBe('<abbr></abbr>');
			});

			it("dom.address", function () {
				var el = dom.address();
				expect(el.getHtml()).toBe('<address></address>');
			});

			it("dom.area", function () {
				var el = dom.area();
				expect(el.getHtml()).toBe('<area>');
			});

			it("dom.article", function () {
				var el = dom.article();
				expect(el.getHtml()).toBe('<article></article>');
			});

			it("dom.aside", function () {
				var el = dom.aside();
				expect(el.getHtml()).toBe('<aside></aside>');
			});

			it("dom.audio", function () {
				var el = dom.audio();
				expect(el.getHtml()).toBe('<audio></audio>');
			});

			it("dom.b", function () {
				var el = dom.b();
				expect(el.getHtml()).toBe('<b></b>');
			});

			it("dom.base", function () {
				var el = dom.base();
				expect(el.getHtml()).toBe('<base>');
			});

			it("dom.blockquote", function () {
				var el = dom.blockquote();
				expect(el.getHtml()).toBe('<blockquote></blockquote>');
			});

			it("dom.br", function () {
				var el = dom.br();
				expect(el.getHtml()).toBe('<br>');
			});

			it("dom.button", function () {
				var el = dom.button();
				expect(el.getHtml()).toBe('<button></button>');
			});

			it("dom.canvas", function () {
				var el = dom.canvas();
				expect(el.getHtml()).toBe('<canvas></canvas>');
			});

			it("dom.caption", function () {
				var el = dom.caption();
				expect(el.getHtml()).toBe('<caption></caption>');
			});

			it("dom.code", function () {
				var el = dom.code();
				expect(el.getHtml()).toBe('<code></code>');
			});

			it("dom.cite", function () {
				var el = dom.cite();
				expect(el.getHtml()).toBe('<cite></cite>');
			});

			it("dom.em", function () {
				var el = dom.em();
				expect(el.getHtml()).toBe('<em></em>');
			});

			it("dom.embed", function () {
				var el = dom.embed();
				expect(el.getHtml()).toBe('<embed>');
			});

			it("dom.fieldset", function () {
				var el = dom.fieldset();
				expect(el.getHtml()).toBe('<fieldset></fieldset>');
			});

			it("dom.footer", function () {
				var el = dom.footer();
				expect(el.getHtml()).toBe('<footer></footer>');
			});

			it("dom.form", function () {
				var el = dom.form();
				expect(el.getHtml()).toBe('<form></form>');
			});

			it("dom.h1", function () {
				var el = dom.h1();
				expect(el.getHtml()).toBe('<h1></h1>');
			});

			it("dom.h2", function () {
				var el = dom.h2();
				expect(el.getHtml()).toBe('<h2></h2>');
			});

			it("dom.h3", function () {
				var el = dom.h3();
				expect(el.getHtml()).toBe('<h3></h3>');
			});

			it("dom.h4", function () {
				var el = dom.h4();
				expect(el.getHtml()).toBe('<h4></h4>');
			});

			it("dom.h5", function () {
				var el = dom.h5();
				expect(el.getHtml()).toBe('<h5></h5>');
			});

			it("dom.h6", function () {
				var el = dom.h6();
				expect(el.getHtml()).toBe('<h6></h6>');
			});

			it("dom.header", function () {
				var el = dom.header();
				expect(el.getHtml()).toBe('<header></header>');
			});

			it("dom.i", function () {
				var el = dom.i();
				expect(el.getHtml()).toBe('<i></i>');
			});

			it("dom.iframe", function () {
				var el = dom.iframe();
				expect(el.getHtml()).toBe('<iframe></iframe>');
			});

			it("dom.img", function () {
				var el = dom.img();
				expect(el.getHtml()).toBe('<img>');
			});

			it("dom.input", function () {
				var el = dom.input();
				expect(el.getHtml()).toBe('<input>');
			});

			it("dom.label", function () {
				var el = dom.label();
				expect(el.getHtml()).toBe('<label></label>');
			});

			it("dom.legend", function () {
				var el = dom.legend();
				expect(el.getHtml()).toBe('<legend></legend>');
			});

			it("dom.li", function () {
				var el = dom.li();
				expect(el.getHtml()).toBe('<li></li>');
			});

			it("dom.main", function () {
				var el = dom.main();
				expect(el.getHtml()).toBe('<main></main>');
			});

			it("dom.mark", function () {
				var el = dom.mark();
				expect(el.getHtml()).toBe('<mark></mark>');
			});

			it("dom.menu", function () {
				var el = dom.menu();
				expect(el.getHtml()).toBe('<menu></menu>');
			});

			it("dom.menuitem", function () {
				var el = dom.menuitem();
				expect(el.getHtml()).toBe('<menuitem></menuitem>');
			});

			it("dom.meta", function () {
				var el = dom.meta();
				expect(el.getHtml()).toBe('<meta>');
			});

			it("dom.meter", function () {
				var el = dom.meter();
				expect(el.getHtml()).toBe('<meter></meter>');
			});

			it("dom.nav", function () {
				var el = dom.nav();
				expect(el.getHtml()).toBe('<nav></nav>');
			});

			it("dom.noscript", function () {
				var el = dom.noscript();
				expect(el.getHtml()).toBe('<noscript></noscript>');
			});

			it("dom.object", function () {
				var el = dom.object();
				expect(el.getHtml()).toBe('<object></object>');
			});

			it("dom.ol", function () {
				var el = dom.ol();
				expect(el.getHtml()).toBe('<ol></ol>');
			});

			it("dom.option", function () {
				var el = dom.option();
				expect(el.getHtml()).toBe('<option></option>');
			});

			it("dom.p", function () {
				var el = dom.p();
				expect(el.getHtml()).toBe('<p></p>');
			});

			it("dom.param", function () {
				var el = dom.param();
				expect(el.getHtml()).toBe('<param>');
			});

			it("dom.pre", function () {
				var el = dom.pre();
				expect(el.getHtml()).toBe('<pre></pre>');
			});

			it("dom.q", function () {
				var el = dom.q();
				expect(el.getHtml()).toBe('<q></q>');
			});

			it("dom.section", function () {
				var el = dom.section();
				expect(el.getHtml()).toBe('<section></section>');
			});

			it("dom.select", function () {
				var el = dom.select();
				expect(el.getHtml()).toBe('<select></select>');
			});

			it("dom.small", function () {
				var el = dom.small();
				expect(el.getHtml()).toBe('<small></small>');
			});

			it("dom.source", function () {
				var el = dom.source();
				expect(el.getHtml()).toBe('<source>');
			});

			it("dom.strong", function () {
				var el = dom.strong();
				expect(el.getHtml()).toBe('<strong></strong>');
			});

			it("dom.sub", function () {
				var el = dom.sub();
				expect(el.getHtml()).toBe('<sub></sub>');
			});

			it("dom.summary", function () {
				var el = dom.summary();
				expect(el.getHtml()).toBe('<summary></summary>');
			});

			it("dom.sup", function () {
				var el = dom.sup();
				expect(el.getHtml()).toBe('<sup></sup>');
			});

			it("dom.table", function () {
				var el = dom.table();
				expect(el.getHtml()).toBe('<table></table>');
			});

			it("dom.tbody", function () {
				var el = dom.tbody();
				expect(el.getHtml()).toBe('<tbody></tbody>');
			});

			it("dom.td", function () {
				var el = dom.td();
				expect(el.getHtml()).toBe('<td></td>');
			});

			it("dom.textarea", function () {
				var el = dom.textarea();
				expect(el.getHtml()).toBe('<textarea></textarea>');
			});

			it("dom.tfoot", function () {
				var el = dom.tfoot();
				expect(el.getHtml()).toBe('<tfoot></tfoot>');
			});

			it("dom.th", function () {
				var el = dom.th();
				expect(el.getHtml()).toBe('<th></th>');
			});

			it("dom.thead", function () {
				var el = dom.thead();
				expect(el.getHtml()).toBe('<thead></thead>');
			});

			it("dom.title", function () {
				var el = dom.title();
				expect(el.getHtml()).toBe('<title></title>');
			});

			it("dom.tr", function () {
				var el = dom.tr();
				expect(el.getHtml()).toBe('<tr></tr>');
			});

			it("dom.track", function () {
				var el = dom.track();
				expect(el.getHtml()).toBe("<track>" + "</track>");
			});

			it("dom.u", function () {
				var el = dom.u();
				expect(el.getHtml()).toBe('<' + 'u>' + '</u>');
			});

			it("dom.ul", function () {
				var el = dom.ul();
				expect(el.getHtml()).toBe('<ul></ul>');
			});

			it("dom.video", function () {
				var el = dom.video();
				expect(el.getHtml()).toBe('<video></video>');
			});

		});

		describe("css", function () {

			it("dom.cssProperty", function () {
				var prop = dom.cssProperty("borderSize", "2px");
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getName()).toBe('borderSize');
				expect(prop.getValue()).toBe('2px');
				expect(prop.isChangeable()).toBe(false);
			});

			it("dom.cssGroup", function () {
				var prop = dom.cssGroup(":hover",
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getName()).toBe(':hover');
				expect(prop.getCss().length).toBe(2);
			});

			it("dom.css", function () {
				var prop = dom.css(
					dom.cssProperty("borderSize", "2px"),
					dom.cssProperty("borderColor", "red")
				);
				expect(prop.elements.elements.length).toBe(0);
				expect(prop.getCss().length).toBe(2);
			});

		});

		describe("data", function () {

			it("dom.contract", function () {
				var data = dom.contract("test");
				expect(data.getValue()).toBe("test");
				data.setValue("test2");
				expect(data.getValue()).toBe("test2");
			});

		});

	});

}());
