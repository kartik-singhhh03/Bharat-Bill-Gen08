                        reader.onload = (event) => {
                          setInvoice(prev => ({
                            ...prev,
                            companyLogo: event.target?.result as string
                          }))
                        }