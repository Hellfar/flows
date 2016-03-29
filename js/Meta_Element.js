				function			createElements( elems, ns )
				{
					var				a_o = [];

					ns = ns || null;
					switch (typeof (elems))
					{
						case ("string"):
						{
							var		o = document.createTextNode(elems);

							a_o.push(o);
						};
						break;
						case ("object"):
						{
							var		l_elems;

							if (elems.constructor != Array)
								elems = [elems];
							l_elems = elems.length;
							for (var i = 0; i < l_elems; i++)
							{
								var	elem = elems[i],
									o;

								if (typeof (elem.tag) != "undefined")
								{
									if (elem.tag == "#text")
										o = document.createTextNode(elem.value);
									else
									{
										if (ns)
											o = document.createElementNS(ns, elem.tag);
										else
											o = document.createElement(elem.tag);
										if (typeof (elem.child) != "undefined")
										{
											var	t_childs = createElements(elem.child, ns),
												t_l_childs = t_childs.length;
											for(var e = 0; e < t_l_childs; e++)
												o.appendChild(t_childs[e]);
										}
										for (attr in elem)
											if (elem.hasOwnProperty(attr) && elem[attr] && attr != "tag" && attr != "child")
												if (attr == "value")
													o.value = elem[attr];
												else
													if (ns)
														o.setAttributeNS(null, attr, elem[attr]);
													else
														o.setAttribute(attr, elem[attr]);
									}
									a_o.push(o);
								}
							}
						};
						break;
					}
					return (a_o);
				}
